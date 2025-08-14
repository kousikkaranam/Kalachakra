// src/components/layout/layer-toggle.tsx
'use client';

import { useAppStore } from '@/stores/app-store';
import { Button } from '@/components/ui/button';

export function LayerToggle() {
  const { currentLayer, toggleLayer } = useAppStore();
  
  return (
    <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-amber-200">
      <Button
        variant={currentLayer === 'MYTHIC' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => currentLayer !== 'MYTHIC' && toggleLayer()}
        className={`${currentLayer === 'MYTHIC' ? 'bg-amber-600 text-white' : 'text-amber-700'}`}
      >
        🕉️ Mythic
      </Button>
      <Button
        variant={currentLayer === 'MODERN' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => currentLayer !== 'MODERN' && toggleLayer()}
        className={`${currentLayer === 'MODERN' ? 'bg-amber-600 text-white' : 'text-amber-700'}`}
      >
        🔬 Modern
      </Button>
    </div>
  );
}
