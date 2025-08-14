// src/app/timeline/page.tsx
import { TimelineExplorer } from '@/components/timeline/timeline-explorer';

export default function TimelinePage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-amber-900 mb-4">
          Timeline of the Yugas
        </h1>
        <p className="text-amber-700 max-w-3xl mx-auto">
          Explore the four great ages (yugas) that make up a Mahāyuga cycle. 
          Each yuga represents a different phase in the cosmic cycle, 
          with varying durations and characteristics according to Vedic cosmology.
        </p>
      </div>
      
      <TimelineExplorer />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-4 rounded-lg border border-yellow-300">
          <div className="w-4 h-4 bg-yellow-500 rounded mb-2"></div>
          <h3 className="font-semibold text-yellow-800">Satya Yuga</h3>
          <p className="text-sm text-yellow-700">Golden Age of Truth</p>
        </div>
        
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-lg border border-gray-300">
          <div className="w-4 h-4 bg-gray-400 rounded mb-2"></div>
          <h3 className="font-semibold text-gray-800">Treta Yuga</h3>
          <p className="text-sm text-gray-700">Silver Age of Sacrifice</p>
        </div>
        
        <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-4 rounded-lg border border-amber-300">
          <div className="w-4 h-4 bg-amber-600 rounded mb-2"></div>
          <h3 className="font-semibold text-amber-800">Dvapara Yuga</h3>
          <p className="text-sm text-amber-700">Bronze Age of Decline</p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-4 rounded-lg border border-slate-300">
          <div className="w-4 h-4 bg-slate-600 rounded mb-2"></div>
          <h3 className="font-semibold text-slate-800">Kali Yuga</h3>
          <p className="text-sm text-slate-700">Iron Age of Darkness</p>
        </div>
      </div>
    </div>
  );
}
