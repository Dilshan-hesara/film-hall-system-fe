import React from 'react';
import { FileText, CheckCircle } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-10 px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-yellow-500 mb-4 flex justify-center items-center gap-3">
                <FileText /> Terms & Conditions
            </h1>
            <p className="text-gray-400">Please read these terms carefully before booking tickets.</p>
        </div>

        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl space-y-8">
            <section>
                <h2 className="text-xl font-bold text-white mb-3">1. Ticket Booking</h2>
                <p className="text-gray-400 leading-relaxed">
                    All bookings made through MKD Cinemas are subject to availability. 
                    Users must provide accurate personal information during the booking process. 
                    We reserve the right to cancel bookings if fraudulent activity is suspected.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">2. Cinema Hall Conduct</h2>
                <ul className="text-gray-400 space-y-2 list-disc pl-5">
                    <li>Outside food and beverages are strictly prohibited inside the hall.</li>
                    <li>Mobile phones must be put on silent mode during the show.</li>
                    <li>Recording the movie using cameras or phones is a criminal offense.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">3. Age Restrictions</h2>
                <p className="text-gray-400 leading-relaxed">
                    Movies rated 'A' (Adults Only) are strictly for viewers above 18 years. 
                    Valid ID proof may be requested at the entrance. Tickets purchased for underage viewers for 'A' rated movies will not be refunded.
                </p>
            </section>

            <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/30 flex items-start gap-3">
                <CheckCircle className="text-blue-500 mt-1" size={20} />
                <p className="text-sm text-blue-200">
                    By purchasing a ticket, you agree to abide by these terms and conditions. MKD Cinemas reserves the right to modify these terms at any time.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Terms;