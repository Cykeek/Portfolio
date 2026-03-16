import Card from '@/components/ui/Card';

export const metadata = {
  title: 'Privacy Policy | Soumajit',
  description: 'Privacy Policy and Data Handling Practices for Soumajit.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase">
          Privacy Policy
        </h1>
        <p className="text-muted text-[10px] font-medium tracking-widest uppercase">
          Last Updated: March 2026 • Kolkata, India
        </p>
      </div>

      <Card className="p-8 md:p-12 flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">1. Introduction</h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>
              This Privacy Policy explains how Soumajit ("we", "us", or "our") collects, uses, discloses, and safeguards your information when you visit our website at cykeek.com.
            </p>
            <p>
              By accessing or using our website, you agree to this Privacy Policy. If you do not agree with the terms of this policy, please do not access the site.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">2. Information We Collect</h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>
              We collect information in the following ways:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Information You Provide:</strong> When you contact us through the contact form, we collect your name, email address, and message content. This information is transmitted via Web3Forms and securely processed.</li>
              <li><strong>Automatically Collected Information:</strong> We use Vercel Analytics and Speed Insights to collect anonymized, aggregated data about website visits, page views, and general user behavior. This data cannot be used to identify individuals.</li>
            </ul>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">3. Cookies & Tracking Technologies</h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>
              We use cookies to enhance your browsing experience. Upon your first visit, you will be presented with a cookie consent banner.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Analytics Cookies:</strong> Used to understand how visitors interact with our website. These are anonymized and cannot be used to identify you personally.</li>
              <li><strong>Consent Cookie:</strong> Remembers your preference regarding cookie usage.</li>
            </ul>
            <p>
              You can manage or decline cookies through your browser settings. However, declining cookies may affect certain website features.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">4. How We Use Your Information</h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Respond to your inquiries and communicate with you</li>
              <li>Improve our website and user experience</li>
              <li>Analyze usage patterns to optimize site performance</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">5. Third-Party Services</h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>
              We use the following third-party services, each with their own privacy policies:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Vercel:</strong> Hosting and analytics infrastructure. <a href="https://vercel.com/legal/privacy-policy" className="text-white underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
              <li><strong>Web3Forms:</strong> Form submission service. <a href="https://web3forms.com/privacy" className="text-white underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
              <li><strong>hCaptcha:</strong> Spam protection. <a href="https://www.hcaptcha.com/privacy" className="text-white underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
            </ul>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">6. Data Security</h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
            <p>
              The transmission of sensitive information (such as through our contact form) is encrypted using industry-standard protocols.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">7. Your Rights</h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate personal data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Opt-out:</strong> Opt out of analytics tracking via the cookie consent banner</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at: <strong>cykeek@proton.me</strong>
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">8. Data Retention</h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>
              Form submission data is retained for customer service purposes and is deleted upon request. Analytics data is retained in anonymized, aggregated form by Vercel in accordance with their data practices.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">9. Changes to This Policy</h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">10. Contact Us</h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Email: cykeek@proton.me</li>
              <li>Location: Kolkata, India</li>
            </ul>
          </div>
        </section>
      </Card>
    </main>
  );
}
