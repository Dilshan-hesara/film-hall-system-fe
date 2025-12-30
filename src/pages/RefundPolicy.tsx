import React from 'react';
import { RefreshCcw, AlertTriangle } from 'lucide-react';

const RefundPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-10 px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-yellow-500 mb-4 flex justify-center items-center gap-3">
                <RefreshCcw /> Refund & Cancellation Policy
            </h1>
            <p className="text-gray-400">Rules regarding ticket cancellations and refunds.</p>
        </div>

        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl space-y-8">
            
            <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30 flex gap-4 items-start">
                <AlertTriangle className="text-red-500 flex-shrink-0" size={24} />
                <div>
                    <h3 className="text-lg font-bold text-red-400 mb-2">Important Notice</h3>
                    <p className="text-gray-300 text-sm">
                        Tickets once booked are generally non-refundable. However, under specific circumstances outlined below, a refund may be initiated.
                    </p>
                </div>
            </div>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">1. Cancellation by User</h2>
                <ul className="text-gray-400 space-y-2 list-disc pl-5">
                    <li>Cancellations made <strong>24 hours</strong> before showtime: 75% Refund.</li>
                    <li>Cancellations made <strong>12 hours</strong> before showtime: 50% Refund.</li>
                    <li>No refunds for cancellations made within <strong>4 hours</strong> of the showtime.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">2. Show Cancellation by Cinema</h2>
                <p className="text-gray-400 leading-relaxed">
                    If a show is cancelled by MKD Cinemas due to technical issues or unforeseen circumstances, a <strong>100% refund</strong> will be processed to the original payment method within 5-7 working days.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">3. How to Request a Refund</h2>
                <p className="text-gray-400 leading-relaxed">
                    Please contact our support team at <span className="text-blue-400">support@mkdcinemas.com</span> with your Booking ID.
                </p>
            </section>
        </div>

      </div>
    </div>
  );
};

export default RefundPolicy;