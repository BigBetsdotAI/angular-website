import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 bg-primary">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Last updated: January 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="prose prose-gray max-w-none">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Agreement to Terms
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                By accessing or using the services provided by BigBets.AI, you
                agree to be bound by these Terms of Service. If you disagree
                with any part of these terms, you may not access our services.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Description of Services
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                BigBets.AI provides software development, web and mobile
                application development, AI/ML solutions, cloud services, and IT
                consulting. The specific services provided will be outlined in
                separate agreements or statements of work.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. User Responsibilities
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                As a user of our services, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  Provide accurate and complete information when requested
                </li>
                <li>Maintain the confidentiality of any account credentials</li>
                <li>Use our services only for lawful purposes</li>
                <li>
                  Not interfere with or disrupt the integrity of our services
                </li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Intellectual Property
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                All intellectual property rights in our services, including but
                not limited to software, designs, trademarks, and content,
                remain the property of BigBets.AI unless otherwise agreed in
                writing. Upon full payment for custom development work, clients
                receive the agreed-upon rights as specified in their contract.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Payment Terms
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Payment terms will be specified in individual project
                agreements. Generally:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Payments are due according to the agreed-upon schedule</li>
                <li>Late payments may incur additional charges</li>
                <li>
                  Work may be suspended if payments are significantly overdue
                </li>
                <li>All fees are non-refundable unless otherwise specified</li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Confidentiality
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Both parties agree to maintain the confidentiality of any
                proprietary or sensitive information shared during the course of
                our business relationship. This obligation survives the
                termination of any agreement between us.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To the maximum extent permitted by law, BigBets.AI shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages, or any loss of profits or revenues, whether
                incurred directly or indirectly, or any loss of data, use,
                goodwill, or other intangible losses.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Warranties and Disclaimers
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our services are provided "as is" without warranty of any kind,
                express or implied. We do not warrant that our services will be
                uninterrupted, error-free, or completely secure. Specific
                warranties may be provided in individual project agreements.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Termination
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Either party may terminate services according to the terms
                specified in individual agreements. Upon termination, all
                outstanding payments become immediately due, and each party must
                return or destroy any confidential information of the other
                party.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Governing Law
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance
                with the laws of India, without regard to its conflict of law
                provisions. Any disputes arising from these terms shall be
                subject to the exclusive jurisdiction of the courts in
                Ghaziabad, India.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. Changes to Terms
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We reserve the right to modify or replace these Terms at any
                time. If a revision is material, we will provide at least 30
                days' notice prior to any new terms taking effect. What
                constitutes a material change will be determined at our sole
                discretion.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                12. Contact Information
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please
                contact us:
              </p>
              <ul className="list-none text-gray-600 space-y-2">
                <li>
                  <strong>Email:</strong> contact@bigbets.ai
                </li>
                <li>
                  <strong>Phone:</strong> +91 836 887 1848
                </li>
                <li>
                  <strong>Address:</strong> Crossing Republik, Ghaziabad, India
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;
