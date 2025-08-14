// src/app/map/page.tsx
import { LokaMap } from '@/components/loka-map/loka-map';

export default function LokaMapPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-amber-900 mb-4">
          3D Cosmic Realms Map
        </h1>
        <p className="text-amber-700 max-w-3xl mx-auto mb-2">
          Navigate through the seven lokas (cosmic realms) arranged vertically around Mount Meru, 
          the central axis of the universe according to Vedic cosmology.
        </p>
        <p className="text-sm text-amber-600">
          Use mouse to rotate, zoom, and pan. Click on any realm to explore its details.
        </p>
      </div>

      <LokaMap />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-amber-200">
          <h3 className="font-semibold text-amber-900 mb-2">🎮 Controls</h3>
          <ul className="text-sm text-amber-700 space-y-1">
            <li><strong>Rotate:</strong> Left click + drag</li>
            <li><strong>Zoom:</strong> Mouse wheel</li>
            <li><strong>Pan:</strong> Right click + drag</li>
            <li><strong>Select:</strong> Click on any realm</li>
          </ul>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-amber-200">
          <h3 className="font-semibold text-amber-900 mb-2">🏔️ Layout</h3>
          <ul className="text-sm text-amber-700 space-y-1">
            <li><strong>Vertical:</strong> Higher realms above</li>
            <li><strong>Central Axis:</strong> Mount Meru</li>
            <li><strong>Color Coded:</strong> Each realm unique</li>
            <li><strong>Size Varies:</strong> By cosmic significance</li>
          </ul>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-amber-200">
          <h3 className="font-semibold text-amber-900 mb-2">✨ Features</h3>
          <ul className="text-sm text-amber-700 space-y-1">
            <li><strong>Hover:</strong> See realm descriptions</li>
            <li><strong>Bilingual:</strong> Sanskrit + Devanagari</li>
            <li><strong>Interactive:</strong> Direct navigation</li>
            <li><strong>Responsive:</strong> Layer-aware data</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
