import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 40;

type Bucket = { count: number; resetAt: number };

const ipBuckets = new Map<string, Bucket>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

function allowRequest(ip: string): boolean {
  const now = Date.now();
  let b = ipBuckets.get(ip);
  if (!b || now > b.resetAt) {
    ipBuckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (b.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  b.count += 1;
  return true;
}

function pruneOldBuckets(): void {
  if (ipBuckets.size <= 5000) return;
  const now = Date.now();
  for (const [ip, v] of ipBuckets) {
    if (now > v.resetAt) {
      ipBuckets.delete(ip);
    }
  }
}

export function middleware(request: NextRequest) {
  pruneOldBuckets();
  const ip = getClientIp(request);
  if (!allowRequest(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': '60' },
      }
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
