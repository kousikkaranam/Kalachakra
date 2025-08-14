// src/app/entities/[slug]/page.tsx
'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppStore } from '@/stores/app-store';

export default function EntityPage() {
  const params = useParams();
  const router = useRouter();
  const { setSelectedEntityId, setSidebarOpen, selectedEntityId } = useAppStore();
  const slug = params.slug as string;

  useEffect(() => {
    async function loadEntityBySlug() {
      if (!slug) return;

      try {
        // Fetch all entities to find the one with matching slug
        const response = await fetch('/api/entities');
        const data = await response.json();
        
        if (data.success) {
          const entity = data.data.find((e: any) => e.slug === slug);
          if (entity) {
            setSelectedEntityId(entity.id);
            setSidebarOpen(true);
          } else {
            console.error('Entity not found:', slug);
            // Redirect to home if entity not found
            router.push('/');
          }
        }
      } catch (error) {
        console.error('Failed to load entity:', error);
        router.push('/');
      }
    }

    loadEntityBySlug();
  }, [slug, setSelectedEntityId, setSidebarOpen, router]);

  // This page renders nothing - the drawer is shown globally in layout
  return null;
}
