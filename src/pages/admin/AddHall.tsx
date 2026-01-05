// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { addHall } from '../../services/hall';

// const AddHall: React.FC = () => {
//   const navigate = useNavigate();
  
//   const [name, setName] = useState('');
//   const [rows, setRows] = useState(5); // Default 
//   const [columns, setColumns] = useState(8);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       await addHall({ name, rows, columns });
//       alert('Hall Added Successfully!');
//       navigate('/'); // Dashboard
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Failed to add hall');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-6">
//       <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
        
//         <h2 className="text-3xl font-bold mb-6 text-center text-green-400">Add New Hall</h2>
        
//         {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-6 text-center">{error}</div>}

//         <form onSubmit={handleSubmit} className="space-y-6">
          
//           {/* Hall Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-400 mb-1">Hall Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
//               placeholder="e.g. Screen 1 - Dolby Atmos"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             {/* Rows Count */}
//             <div>
//               <label className="block text-sm font-medium text-gray-400 mb-1">Rows (A, B...)</label>
//               <input
//                 type="number"
//                 min="1"
//                 max="20"
//                 value={rows}
//                 onChange={(e) => setRows(Number(e.target.value))}
//                 className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
//                 required
//               />
//             </div>

//             {/* Columns Count */}
//             <div>
//               <label className="block text-sm font-medium text-gray-400 mb-1">Seats per Row</label>
//               <input
//                 type="number"
//                 min="1"
//                 max="50"
//                 value={columns}
//                 onChange={(e) => setColumns(Number(e.target.value))}
//                 className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
//                 required
//               />
//             </div>
//           </div>

//           {/* Auto Calculated Capacity Display */}
//           <div className="bg-gray-900 p-4 rounded-lg border border-gray-600 text-center">
//             <p className="text-gray-400 text-sm">Total Capacity</p>
//             <p className="text-3xl font-bold text-green-400">{rows * columns} Seats</p>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 rounded-lg font-bold text-lg transition duration-300 shadow-lg
//               ${loading 
//                 ? 'bg-gray-600 cursor-not-allowed' 
//                 : 'bg-green-600 hover:bg-green-500 text-white shadow-green-600/30'}
//             `}
//           >
//             {loading ? 'Adding...' : 'Create Hall'}
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddHall;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addHall } from '../../services/hall';
import { Grid } from 'lucide-react'; // Icons

const AddHall: React.FC = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [rows, setRows] = useState(5); 
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
      navigate('/admin/manage-halls');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add hall');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-6">
      
      {/* Container: Two Columns on Large Screens */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
        
        {/* LEFT SIDE: FORM */}
        <div>
            <h2 className="text-3xl font-bold mb-6 text-green-400 flex items-center gap-2">
                <Grid /> Add New Hall
            </h2>
            
            {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-6 text-center">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Hall Name */}
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Hall Name</label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none transition"
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
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none transition"
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
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none transition"
                    required
                />
                </div>
            </div>

            {/* Capacity Display */}
            <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30 text-center">
                <p className="text-gray-400 text-sm">Total Capacity</p>
                <p className="text-3xl font-bold text-green-400">{rows * columns} Seats</p>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-bold text-lg transition duration-300 shadow-lg flex items-center justify-center gap-2
                ${loading 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-500 text-white shadow-green-600/30'}
                `}
            >
                {loading ? 'Creating...' : 'Create Hall'}
            </button>

            </form>
        </div>

        {/* RIGHT SIDE: PREVIEW */}
        <div className="flex flex-col items-center justify-center bg-gray-900/50 rounded-xl p-6 border border-gray-700 overflow-hidden relative">
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-6 font-bold absolute top-4">Live Preview</p>
            
            {/* Screen Visual */}
            <div className="w-2/3 h-6 bg-gradient-to-b from-blue-500/40 to-transparent rounded-t-full shadow-[0_0_15px_rgba(59,130,246,0.3)] mb-8 mt-6"></div>
            <p className="text-[10px] text-blue-400 uppercase tracking-[0.3em] mb-4">Screen</p>

            {/* Seat Grid Preview */}
            <div className="flex flex-col gap-1 max-h-[300px] overflow-auto p-4 custom-scrollbar bg-gray-900 rounded-lg border border-gray-800 shadow-inner">
                {Array.from({ length: Math.min(rows, 15) }).map((_, r) => (
                    <div key={r} className="flex gap-1 justify-center">
                        {Array.from({ length: Math.min(columns, 20) }).map((_, c) => (
                            <div 
                                key={c} 
                                className="w-4 h-4 bg-gray-600 rounded-sm hover:bg-green-500 transition-colors cursor-default"
                                title={`Row ${r+1}, Seat ${c+1}`}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Limitations Note */}
            {(rows > 15 || columns > 20) && (
                <p className="text-xs text-yellow-500 mt-4 bg-yellow-900/20 px-3 py-1 rounded-full border border-yellow-500/20">
                    * Preview is limited to 15x20 for display purposes.
                </p>
            )}

            <div className="mt-6 flex gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-600 rounded-sm"></div> Seat</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500/40 rounded-sm"></div> Screen</div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AddHall;