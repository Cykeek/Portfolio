import Card from '@/components/ui/Card';

export const metadata = {
  title: 'Terms of Service | Soumajit',
  description: 'Terms of Service for Soumajit Portfolio.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase">
          Terms of Service
        </h1>
        <p className="text-muted text-[10px] font-medium tracking-widest uppercase">
          Last Updated: March 2026 • Kolkata, India
        </p>
      </div>

      <Card className="p-8 md:p-12 flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">1. Agreement to Terms</h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>
              These Terms of Service ("Terms") constitute a legally binding agreement between you ("User", "you") and Soumajit, operated by Soumajit Das ("Soumajit", "Company", "we", "us").
            </p>
            <p>
              By accessing or using our website at cykeek.com, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access the website.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">2. Intellectual Property</h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>
              The website and its original content, including but not limited to text, images, graphics, logos, and code, are the exclusive property of Soumajit and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works from, publicly display, publicly perform, republish, download, store, or transmit any material from this website without our prior written consent.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">3. User Conduct</h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>
              When using this website, you agree to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use the website only for lawful purposes</li>
              <li>Not attempt to gain unauthorized access to any part of the website</li>
              <li>Not interfere with the proper working of the website</li>
              <li>Not introduce any malicious code, viruses, or harmful content</li>
              <li>Not scrape, crawl, or otherwise extract data from the website automatically</li>
            </ul>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">4. User Content</h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>
              Our website may include interactive features such as contact forms. Any content you submit through these forms must be original or properly licensed.
            </p>
            <p>
              You retain ownership of any content you submit but grant us a license to use it for responding to your inquiries.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">5. Disclaimer of Warranties</h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>
              The website is provided "as is" and "as available" without any representations or warranties, express or implied.
            </p>
            <p>
              We do not warrant that the website will be constantly available, or available at all. We aim to keep the website operational but cannot guarantee uninterrupted access.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">6. Limitation of Liability</h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>
              To the fullest extent permitted by law, Soumajit shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the website.
            </p>
            <p>
              Our total liability shall not exceed the amount, if any, paid by you to us for using the website.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">7. Indemnification</h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>
              You agree to indemnify, defend, and hold harmless Soumajit and its owner from any claims, damages, liabilities, costs, or expenses arising out of your use of the website or your violation of these Terms.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">8. External Links</h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>
              Our website may contain links to third-party websites. We have no control over the content or practices of these websites and accept no responsibility for them.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">9. Governing Law</h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Kolkata, West Bengal, India.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">10. Changes to Terms</h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>
              We reserve the right to modify these Terms at any time. Updated terms will be posted on this page with a new "Last Updated" date. Your continued use of the website after any changes constitutes acceptance of the new Terms.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">11. Contact</h2>
          <div className="text-sm text-muted leading-relaxed space-y-4">
            <p>
              For any questions about these Terms, please contact us at: <strong>cykeek@proton.me</strong>
            </p>
          </div>
        </section>
      </Card>
    </main>
  );
}
