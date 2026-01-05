import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Home, Camera } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="z-10 text-center max-w-lg">
        
        <div className="flex justify-center items-center gap-2 mb-8 opacity-70">
            <Film className="text-red-600" size={32} />
            <span className="text-xl font-bold tracking-widest">MKD CINEMAS</span>
        </div>

        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-500 drop-shadow-lg">
          404
        </h1>

        <div className="mt-4 mb-8 space-y-2">
            <h2 className="text-3xl font-bold text-white flex justify-center items-center gap-2">
                <Camera size={32} className="text-yellow-500"/> Cut! Scene Not Found.
            </h2>
            <p className="text-gray-400 text-lg">
                Looks like this reel went missing in the editing room.
                The page you are looking for doesn't exist or has been moved.
            </p>
        </div>

        <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-red-900/30 transform hover:scale-105"
        >
            <Home size={20} /> Back to Home Screen
        </Link>

      </div>

      <div className="absolute bottom-4 text-gray-600 text-xs">
        Error Code: 404_PAGE_NOT_FOUND
      </div>

    </div>
  );
};

export default NotFound;