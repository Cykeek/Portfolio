import { NextResponse } from 'next/server';

const REPO_OWNER = 'Cykeek';
const REPO_NAME = 'Portfolio';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sha: string }> }
) {
  const { sha } = await params;
  
  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits/${sha}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch commit details' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}