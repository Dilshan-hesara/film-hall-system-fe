import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addHall } from '../../services/hall';

const AddHall: React.FC = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [rows, setRows] = useState(5); // Default 
  const [columns, setColumns] = useState(8);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await addHall({ name, rows, columns });
      alert('Hall Added Successfully!');
      navigate('/'); // Dashboard
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add hall');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
        
        <h2 className="text-3xl font-bold mb-6 text-center text-green-400">Add New Hall</h2>
        
        {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-6 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Hall Name */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Hall Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="e.g. Screen 1 - Dolby Atmos"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Rows Count */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Rows (A, B...)</label>
              <input
                type="number"
                min="1"
                max="20"
                value={rows}
                onChange={(e) => setRows(Number(e.target.value))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>

            {/* Columns Count */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Seats per Row</label>
              <input
                type="number"
                min="1"
                max="50"
                value={columns}
                onChange={(e) => setColumns(Number(e.target.value))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Auto Calculated Capacity Display */}
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-600 text-center">
            <p className="text-gray-400 text-sm">Total Capacity</p>
            <p className="text-3xl font-bold text-green-400">{rows * columns} Seats</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-lg transition duration-300 shadow-lg
              ${loading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-500 text-white shadow-green-600/30'}
            `}
          >
            {loading ? 'Adding...' : 'Create Hall'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddHall;