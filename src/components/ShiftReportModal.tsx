import React, { useEffect, useState } from 'react';
import { X, DollarSign, CreditCard, AlertCircle, Wallet } from 'lucide-react';
import axios from 'axios';

const ShiftReportModal = ({ isOpen, onClose }) => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchReport();
    }
  }, [isOpen]);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/reports/daily');
      setReportData(res.data);
    } catch (error) {
      console.error("Error fetching report", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 w-full max-w-md rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">📑 Daily Shift Report</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {loading ? (
            <div className="text-center text-gray-400 py-10">Loading Report...</div>
          ) : reportData ? (
            <>
              <div className="text-sm text-gray-400 text-center mb-4">
                Date: <span className="text-white font-medium">{reportData.date}</span>
              </div>

              {/* 1. Cash Collected */}
              <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center gap-3">
                  <DollarSign className="text-green-400" />
                  <span className="text-gray-200">Total Cash (අතේ මුදල්)</span>
                </div>
                <span className="text-xl font-bold text-white">
                  Rs. {reportData.totalCashCollected}
                </span>
              </div>

              {/* 2. Online Payments */}
              <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center gap-3">
                  <CreditCard className="text-blue-400" />
                  <span className="text-gray-200">Online / Card</span>
                </div>
                <span className="text-xl font-bold text-white">
                  Rs. {reportData.totalOnlineBookings}
                </span>
              </div>

              {/* 3. Cancelled */}
              <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg border-l-4 border-red-500">
                <div className="flex items-center gap-3">
                  <AlertCircle className="text-red-400" />
                  <span className="text-gray-200">Cancelled / Refunded</span>
                </div>
                <span className="text-xl font-bold text-white">
                  Rs. {reportData.cancelledAmount}
                </span>
              </div>

              <hr className="border-gray-600 my-2" />

              <div className="bg-blue-900/30 p-4 rounded-xl border border-blue-500/50 text-center">
                <div className="flex justify-center items-center gap-2 mb-1">
                  <Wallet className="text-blue-400" size={20}/>
                  <span className="text-blue-200 text-sm uppercase tracking-wider font-semibold">
                    Net Balance to Handover
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-white">
                  Rs. {reportData.netBalance}
                </div>
                <p className="text-xs text-blue-300 mt-1">
                  (Receptionist භාර දිය යුතු මුදල)
                </p>
              </div>
            </>
          ) : (
            <div className="text-red-400 text-center">No data found</div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-750 flex justify-end border-t border-gray-700">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShiftReportModal;