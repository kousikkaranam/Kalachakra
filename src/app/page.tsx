// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/stores/app-store';

interface Entity {
  id: string;
  type: string;
  slug: string;
  nameIast: string;
  nameDevanagari?: string;
  summary?: string;
}

export default function HomePage() {
  const router = useRouter();
  const { currentLayer } = useAppStore();
  const [lokas, setLokas] = useState<Entity[]>([]);
  const [yugas, setYugas] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [lokasRes, yugasRes] = await Promise.all([
          fetch(`/api/entities?type=LOKA&layer=${currentLayer}`),
          fetch(`/api/entities?type=YUGA&layer=${currentLayer}`)
        ]);
        
        const lokasData = await lokasRes.json();
        const yugasData = await yugasRes.json();
        
        setLokas(lokasData.data || []);
        setYugas(yugasData.data || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [currentLayer]);

  const handleEntityClick = (slug: string) => {
    router.push(`/entities/${slug}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-amber-600 text-lg">Loading cosmic data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-amber-900 mb-4">
          Welcome to Kalachakra - The Vedic Cosmology Atlas
        </h2>
        <p className="text-amber-700 max-w-2xl mx-auto">
          Explore the cosmic realms (lokas) and time cycles (yugas) of Vedic cosmology.<br/>
          Toggle between mythic and modern interpretations using the switch above.
        </p>
        <p className="text-sm text-amber-600 mt-2">
          Currently viewing: <span className="font-semibold">{currentLayer}</span> perspective
        </p>
      </div>

      {/* Lokas Section */}
      <section>
        <h3 className="text-2xl font-bold text-amber-800 mb-4 flex items-center">
          🏔️ Cosmic Realms (Lokas)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lokas.map((loka) => (
            <div 
              key={loka.id}
              className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-amber-200 hover:shadow-md hover:border-amber-300 transition-all cursor-pointer group"
              onClick={() => handleEntityClick(loka.slug)}
            >
              <h4 className="font-semibold text-amber-900 mb-2 group-hover:text-amber-800 transition-colors">
                {loka.nameIast}
                {loka.nameDevanagari && (
                  <span className="text-sm text-amber-600 ml-2">
                    ({loka.nameDevanagari})
                  </span>
                )}
              </h4>
              <p className="text-sm text-amber-700">{loka.summary}</p>
              <div className="mt-2 text-xs text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Click to explore details →
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Yugas Section */}
      <section>
        <h3 className="text-2xl font-bold text-amber-800 mb-4 flex items-center">
          ⏰ Time Cycles (Yugas)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {yugas.map((yuga) => (
            <div 
              key={yuga.id}
              className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-amber-200 hover:shadow-md hover:border-amber-300 transition-all cursor-pointer group"
              onClick={() => handleEntityClick(yuga.slug)}
            >
              <h4 className="font-semibold text-amber-900 mb-2 group-hover:text-amber-800 transition-colors">
                {yuga.nameIast}
                {yuga.nameDevanagari && (
                  <span className="text-sm text-amber-600 ml-2">
                    ({yuga.nameDevanagari})
                  </span>
                )}
              </h4>
              <p className="text-sm text-amber-700">{yuga.summary}</p>
              <div className="mt-2 text-xs text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Click to explore details →
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
