// src/components/entity/entity-detail-drawer.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/stores/app-store';
import { X, BookOpen, Clock, Copy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EntityDetail {
  id: string;
  key: string;
  value: any;
  layer: string;
  notes?: string;
}

interface EntityData {
  id: string;
  type: string;
  slug: string;
  nameIast: string;
  nameDevanagari?: string;
  summary?: string;
  details: EntityDetail[];
}

export function EntityDetailDrawer() {
  const router = useRouter();
  const { selectedEntityId, sidebarOpen, setSidebarOpen, setSelectedEntityId, currentLayer } = useAppStore();
  const [entityData, setEntityData] = useState<EntityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fetch entity details when selectedEntityId changes
  useEffect(() => {
    if (!selectedEntityId) {
      setEntityData(null);
      return;
    }

    async function fetchEntityDetails() {
      try {
        setLoading(true);
        
        // First get the entity to find its slug
        const entitiesResponse = await fetch('/api/entities');
        const entitiesData = await entitiesResponse.json();
        const entity = entitiesData.data.find((e: any) => e.id === selectedEntityId);
        
        if (!entity) {
          console.error('Entity not found');
          return;
        }

        // Then get detailed information
        const response = await fetch(`/api/entities/${entity.slug}?layer=${currentLayer}`);
        const data = await response.json();
        
        if (data.success) {
          setEntityData(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch entity details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEntityDetails();
  }, [selectedEntityId, currentLayer]);

  const closeDrawer = () => {
    setSidebarOpen(false);
    setSelectedEntityId(null);
    // Navigate back to previous page
    router.back();
  };

  const copyUrl = async () => {
    if (entityData) {
      try {
        await navigator.clipboard.writeText(`${window.location.origin}/entities/${entityData.slug}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy URL:', error);
      }
    }
  };

  const getDrawerTitle = (type: string) => {
    switch (type) {
      case 'LOKA': return 'Cosmic Realm';
      case 'YUGA': return 'Time Cycle';
      case 'MANVANTARA': return 'Cosmic Epoch';
      case 'KALPA': return 'Cosmic Day';
      case 'BEING': return 'Cosmic Being';
      default: return 'Entity';
    }
  };

  if (!sidebarOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={closeDrawer}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-amber-200 bg-amber-50">
            <h2 className="text-lg font-semibold text-amber-900">
              {entityData ? getDrawerTitle(entityData.type) : 'Loading...'}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeDrawer}
              className="text-amber-600 hover:text-amber-900"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-amber-600">Loading details...</div>
              </div>
            ) : entityData ? (
              <div className="space-y-6">
                {/* Title Section */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded">
                      {entityData.type}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      {currentLayer} View
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-amber-900">
                      {entityData.nameIast}
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={copyUrl}
                      className="h-6 w-6 text-amber-600 hover:text-amber-900"
                      title="Copy link"
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  {entityData.nameDevanagari && (
                    <p className="text-lg text-amber-700 mb-2">
                      {entityData.nameDevanagari}
                    </p>
                  )}
                  
                  {entityData.summary && (
                    <p className="text-amber-800 leading-relaxed">
                      {entityData.summary}
                    </p>
                  )}
                  
                  {copied && (
                    <div className="mt-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                      Link copied to clipboard!
                    </div>
                  )}
                </div>

                {/* Details Section */}
                {entityData.details && entityData.details.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Detailed Information
                    </h4>
                    
                    <div className="space-y-3">
                      {entityData.details.map((detail) => (
                        <div key={detail.id} className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-amber-900 capitalize">
                              {detail.key.replace(/_/g, ' ')}
                            </span>
                            <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded">
                              {detail.layer}
                            </span>
                          </div>
                          
                          <div className="text-amber-800">
                            {typeof detail.value === 'object' ? (
                              <div className="space-y-1">
                                {Object.entries(detail.value).map(([key, value]) => (
                                  <div key={key} className="flex justify-between">
                                    <span className="text-sm font-medium">{key}:</span>
                                    <span className="text-sm">
                                      {typeof value === 'number' 
                                        ? value.toLocaleString() 
                                        : String(value)
                                      }
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span>{String(detail.value)}</span>
                            )}
                          </div>
                          
                          {detail.notes && (
                            <p className="text-xs text-amber-600 mt-2 italic">
                              {detail.notes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="border-t border-amber-200 pt-4">
                  <h4 className="font-semibold text-amber-900 mb-3">Explore Further</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        router.push(`/search?related=${entityData.slug}`);
                      }}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Find Related Entities
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        router.push('/timeline');
                        closeDrawer();
                      }}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      View on Timeline
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-8">
                <div className="text-amber-600">No entity selected</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
