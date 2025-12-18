import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';

const faqData = [
    { question: "How do I book a ticket?", answer: "You can book a ticket by selecting a movie from the homepage, choosing your preferred hall and seat, and completing the payment." },
    { question: "Can I cancel my booking?", answer: "Yes, cancellations are allowed up to 4 hours before the showtime. Please refer to our Refund Policy for more details." },
    { question: "Do you offer parking facilities?", answer: "Yes, we have ample parking space available for both cars and motorbikes at the cinema premises." },
    { question: "Are kids allowed for all movies?", answer: "Kids are allowed for movies rated 'U' or 'UA'. For 'A' rated movies, entry is restricted to individuals above 18 years." },
    { question: "Do I need to print my ticket?", answer: "No, a printed ticket is not mandatory. You can show the QR code on your mobile device at the entrance." },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqData.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-10 px-6">
      <div className="max-w-3xl mx-auto">
        
        <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-yellow-500 mb-4 flex justify-center items-center gap-3">
                <HelpCircle /> Help & FAQ
            </h1>
            <p className="text-gray-400">Frequently asked questions about MKD Cinemas.</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input 
                type="text" 
                placeholder="Search for questions..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-full py-3 pl-12 pr-6 text-white focus:outline-none focus:border-yellow-500 transition-all"
            />
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
            {filteredFAQs.map((item, index) => (
                <div key={index} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <button 
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-700/50 transition-colors"
                    >
                        <span className="font-semibold text-white">{item.question}</span>
                        {openIndex === index ? <ChevronUp className="text-yellow-500"/> : <ChevronDown className="text-gray-400"/>}
                    </button>
                    
                    {openIndex === index && (
                        <div className="p-5 pt-0 text-gray-400 text-sm leading-relaxed border-t border-gray-700/50 mt-2">
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}

            {filteredFAQs.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No results found for "{searchTerm}".</p>
            )}
        </div>

      </div>
    </div>
  );
};

export default FAQ;