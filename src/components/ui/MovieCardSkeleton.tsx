import React from 'react';
import Skeleton from '../ui/Skeleton';

const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700">
      
      {/* 1. Poster Image Area*/}
      <div className="relative h-80 w-full">
        <Skeleton className="h-full w-full" />
      </div>

      {/* 2. Content Area */}
      <div className="p-5 space-y-4">
        
        {/* Title Line */}
        <Skeleton className="h-6 w-3/4" />

        {/* Description Lines  */}
        <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
        </div>
        
        {/* Info Row (Time & Price) */}
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        
        {/* Button Area */}
        <Skeleton className="h-10 w-full rounded-lg mt-2" />

      </div>
    </div>
  );
};

export default MovieCardSkeleton;