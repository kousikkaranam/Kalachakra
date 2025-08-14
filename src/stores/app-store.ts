// src/stores/app-store.ts
import { create } from 'zustand';

type DataLayer = 'MYTHIC' | 'MODERN';

interface AppState {
  currentLayer: DataLayer;
  selectedEntityId: string | null;
  searchQuery: string;
  sidebarOpen: boolean;
  
  // Actions
  setCurrentLayer: (layer: DataLayer) => void;
  setSelectedEntityId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleLayer: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentLayer: 'MYTHIC',
  selectedEntityId: null,
  searchQuery: '',
  sidebarOpen: false,
  
  setCurrentLayer: (layer) => set({ currentLayer: layer }),
  setSelectedEntityId: (id) => set({ selectedEntityId: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleLayer: () => set((state) => ({ 
    currentLayer: state.currentLayer === 'MYTHIC' ? 'MODERN' : 'MYTHIC' 
  })),
}));
