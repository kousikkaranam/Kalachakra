// src/app/search/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchBar } from '@/components/search/search-bar';

interface Entity {
  id: string;
  type: string;
  slug: string;
  nameIast: string;
  nameDevanagari?: string;
  summary?: string;
}

interface SearchResults {
  success: boolean;
  query: string;
  results: Entity[];
  groupedResults: Record<string, Entity[]>;
  count: number;
  mode: string;
}

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setSearchResults(null);
      return;
    }

    async function performSearch() {
      try {
        setLoading(true);
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    }

    performSearch();
  }, [query]);

  const handleEntityClick = (slug: string) => {
    router.push(`/entities/${slug}`);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'LOKA': return '🏔️';
      case 'YUGA': return '⏰';
      default: return '📖';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'LOKA': return 'Cosmic Realms';
      case 'YUGA': return 'Time Cycles';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-amber-900 mb-4">
          Search Kalachakra
        </h1>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-amber-600">Searching...</div>
        </div>
      ) : query && searchResults ? (
        <div className="space-y-6">
          {/* Results Summary */}
          <div className="text-center">
            <p className="text-amber-700">
              Found <strong>{searchResults.count}</strong> results for "{searchResults.query}"
            </p>
          </div>

          {/* Grouped Results */}
          {searchResults.count > 0 ? (
            Object.entries(searchResults.groupedResults).map(([type, entities]) => (
              <section key={type}>
                <h2 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
                  {getTypeIcon(type)} {getTypeLabel(type)}
                  <span className="text-sm font-normal text-amber-600">
                    ({entities.length})
                  </span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {entities.map((entity) => (
                    <div
                      key={entity.id}
                      className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-amber-200 hover:shadow-md hover:border-amber-300 transition-all cursor-pointer group"
                      onClick={() => handleEntityClick(entity.slug)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">
                          {entity.type}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-amber-900 mb-2 group-hover:text-amber-800 transition-colors">
                        {entity.nameIast}
                        {entity.nameDevanagari && (
                          <span className="text-sm text-amber-600 ml-2">
                            ({entity.nameDevanagari})
                          </span>
                        )}
                      </h3>
                      
                      {entity.summary && (
                        <p className="text-sm text-amber-700 line-clamp-3">
                          {entity.summary}
                        </p>
                      )}
                      
                      <div className="mt-2 text-xs text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to explore details →
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-amber-600 mb-4">No results found for "{query}"</p>
              <p className="text-sm text-amber-500">
                Try searching for terms like "kali", "satya", "loka", or "yuga"
              </p>
            </div>
          )}
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <p className="text-amber-600">Enter a search term to find cosmic realms and time cycles</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-amber-600">Enter a search term above to explore Kalachakra</p>
        </div>
      )}
    </div>
  );
}
