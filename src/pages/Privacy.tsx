import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-10 px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-yellow-500 mb-4 flex justify-center items-center gap-3">
                <ShieldCheck /> Privacy Policy
            </h1>
            <p className="text-gray-400">How we collect, use, and protect your data.</p>
        </div>

        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl space-y-8">
            <section>
                <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
                <p className="text-gray-400 leading-relaxed">
                    When you create an account or book a ticket, we collect personal details such as:
                </p>
                <ul className="text-gray-400 list-disc pl-5 mt-2">
                    <li>Full Name</li>
                    <li>Email Address</li>
                    <li>Phone Number</li>
                    <li>Payment Details (Processed securely via third-party gateways)</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Data</h2>
                <p className="text-gray-400 leading-relaxed">
                    Your data is used to process bookings, send ticket confirmations (QR Codes), 
                    and improve our services. We do <strong>not</strong> sell your data to advertisers.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">3. Data Security</h2>
                <div className="flex items-center gap-4 bg-green-900/20 p-4 rounded-lg border border-green-600/30">
                    <Lock className="text-green-500" size={24}/>
                    <p className="text-gray-300 text-sm">
                        We use industry-standard encryption to protect your personal information. Passwords are hashed and never stored in plain text.
                    </p>
                </div>
            </section>
        </div>

      </div>
    </div>
  );
};

export default Privacy;