import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin ,MessageSquare } from 'lucide-react'; // Icons

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-800 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* 1. BRAND & ABOUT */}
          <div>
            <Link to="/" className="text-3xl font-bold text-white flex items-center gap-2 mb-4">
               🎬 <span className="text-yellow-500">MKD</span>Cinemas
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Experience movies like never before with MKD Cinemas. We offer the best sound systems, comfortable seating, and a premium cinematic experience.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-yellow-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-yellow-500 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-yellow-500 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* 2. QUICK LINKS */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-l-4 border-yellow-500 pl-3">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-yellow-500 transition-colors">Home</Link></li>
              <li><Link to="/movies" className="hover:text-yellow-500 transition-colors">Now Showing</Link></li>
              <li><Link to="/my-bookings" className="hover:text-yellow-500 transition-colors">My Tickets</Link></li>
              <li><Link to="/login" className="hover:text-yellow-500 transition-colors">Login / Register</Link></li>
            </ul>
          </div>

          {/* 3. LEGAL & HELP */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-l-4 border-blue-500 pl-3">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/terms" className="hover:text-blue-400 transition-colors">Terms & Conditions</a></li>
              <li><a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="/faq" className="hover:text-blue-400 transition-colors">FAQ</a></li>
              <li><a href="/refund-policy" className="hover:text-blue-400 transition-colors">Refund Policy</a></li>
            
            <li className="pt-2">
                <Link to="/feedback" className="flex items-center gap-2 text-yellow-500 hover:text-white transition-colors font-semibold">
                    <MessageSquare size={16} /> Give Feedback
                </Link>
              </li>

            </ul>
          </div>

          {/* 4. CONTACT INFO */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-l-4 border-red-500 pl-3">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-red-500 mt-1 min-w-[18px]" />
                <span>No. 123, Cinema Road,<br />Colombo 07, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-red-500" />
                <span>+94 11 234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-red-500" />
                <span>support@mkdcinemas.lk</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          {/* Copyright Name Update */}
          <p>&copy; {new Date().getFullYear()} MKD Cinemas. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <span>Designed for Entertainment</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;