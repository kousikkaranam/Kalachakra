# Kalachakra
Interactive map of lokas, yugas, manvantaras with timelines, relationships, and sourced verses; toggle “mythic model” vs. “modern cosmology” views.



# Kalachakra Project Structure
kalachakra/
├── 📁 .next/                      # Next.js build output (auto-generated)
├── 📁 .git/                       # Git repository files
├── 📁 node_modules/               # Dependencies (auto-generated)
│
├── 📁 public/                     # Static assets served from root
│   ├── 🖼️ favicon.ico
│   ├── 🖼️ logo.svg
│   └── 📁 images/
│       ├── 📁 lokas/               # Loka visualization assets
│       ├── 📁 timeline/            # Timeline icons and graphics
│       └── 📁 sources/             # Scanned manuscript pages
│
├── 📁 src/                        # Main application source code
│   ├── 📁 app/                    # Next.js App Router (main application)
│   │   ├── 📄 layout.tsx          # Root layout component
│   │   ├── 📄 page.tsx            # Home page (main dashboard)
│   │   ├── 📄 loading.tsx         # Global loading UI
│   │   ├── 📄 error.tsx           # Global error UI
│   │   ├── 📄 not-found.tsx       # 404 page
│   │   ├── 📄 globals.css         # Global styles
│   │   ├── 📄 providers.tsx       # Context providers (React Query, etc.)
│   │   │
│   │   ├── 📁 api/                # API routes (backend endpoints)
│   │   │   ├── 📁 entities/
│   │   │   │   ├── 📄 route.ts    # GET /api/entities (list all)
│   │   │   │   └── 📁 [slug]/
│   │   │   │       └── 📄 route.ts # GET /api/entities/:slug (entity details)
│   │   │   ├── 📁 search/
│   │   │   │   └── 📄 route.ts    # GET /api/search (hybrid search)
│   │   │   ├── 📁 timeline/
│   │   │   │   └── 📄 route.ts    # GET /api/timeline (timeline data)
│   │   │   ├── 📁 relationships/
│   │   │   │   └── 📄 route.ts    # GET /api/relationships (entity connections)
│   │   │   └── 📁 embeddings/
│   │   │       └── 📄 route.ts    # POST /api/embeddings (generate vectors)
│   │   │
│   │   ├── 📁 entities/           # Entity detail pages
│   │   │   ├── 📄 page.tsx        # Entities list page
│   │   │   └── 📁 [slug]/
│   │   │       └── 📄 page.tsx    # Individual entity page
│   │   │
│   │   ├── 📁 timeline/           # Timeline explorer page
│   │   │   └── 📄 page.tsx
│   │   │
│   │   ├── 📁 map/                # 3D Loka map page
│   │   │   └── 📄 page.tsx
│   │   │
│   │   ├── 📁 search/             # Search results page
│   │   │   └── 📄 page.tsx
│   │   │
│   │   └── 📁 about/              # About and documentation
│   │       └── 📄 page.tsx
│   │
│   ├── 📁 components/             # Reusable UI components
│   │   ├── 📁 ui/                 # Base UI components (shadcn/ui style)
│   │   │   ├── 📄 button.tsx
│   │   │   ├── 📄 input.tsx
│   │   │   ├── 📄 card.tsx
│   │   │   ├── 📄 badge.tsx
│   │   │   ├── 📄 toggle.tsx      # For mythic/modern switch
│   │   │   ├── 📄 sheet.tsx       # Side panels
│   │   │   ├── 📄 tooltip.tsx
│   │   │   └── 📄 dialog.tsx
│   │   │
│   │   ├── 📁 layout/             # Layout components
│   │   │   ├── 📄 header.tsx      # Top navigation
│   │   │   ├── 📄 sidebar.tsx     # Entity detail panel
│   │   │   ├── 📄 footer.tsx
│   │   │   └── 📄 navigation.tsx  # Main navigation menu
│   │   │
│   │   ├── 📁 timeline/           # Timeline visualization components
│   │   │   ├── 📄 timeline-explorer.tsx    # Main timeline component
│   │   │   ├── 📄 timeline-controls.tsx    # Zoom/navigation controls
│   │   │   ├── 📄 yuga-band.tsx           # Yuga timeline bands
│   │   │   ├── 📄 manvantara-section.tsx  # Manvantara sections
│   │   │   └── 📄 kalpa-overview.tsx      # Kalpa level view
│   │   │
│   │   ├── 📁 loka-map/           # 3D cosmic map components
│   │   │   ├── 📄 loka-map.tsx    # Main 3D scene
│   │   │   ├── 📄 loka-sphere.tsx # Individual loka representations
│   │   │   ├── 📄 camera-controls.tsx     # 3D navigation
│   │   │   ├── 📄 loka-labels.tsx # Text labels and descriptions
│   │   │   └── 📄 cosmic-axis.tsx # Central axis (Mount Meru)
│   │   │
│   │   ├── 📁 search/             # Search-related components
│   │   │   ├── 📄 search-bar.tsx  # Global search input
│   │   │   ├── 📄 search-results.tsx      # Results display
│   │   │   ├── 📄 search-filters.tsx      # Filter by entity type
│   │   │   └── 📄 semantic-suggestions.tsx # AI-powered suggestions
│   │   │
│   │   ├── 📁 entity/             # Entity-specific components
│   │   │   ├── 📄 entity-card.tsx # Entity preview cards
│   │   │   ├── 📄 entity-detail.tsx       # Detailed entity view
│   │   │   ├── 📄 entity-relationships.tsx # Relationship graph
│   │   │   ├── 📄 citation-list.tsx       # Source citations
│   │   │   └── 📄 verse-display.tsx       # Sanskrit verse formatting
│   │   │
│   │   ├── 📁 text/               # Text and typography components
│   │   │   ├── 📄 devanagari-text.tsx     # Devanagari script display
│   │   │   ├── 📄 iast-text.tsx   # IAST transliteration
│   │   │   ├── 📄 verse-card.tsx  # Individual verse display
│   │   │   └── 📄 translation-toggle.tsx  # Switch between translations
│   │   │
│   │   └── 📁 visualization/      # Shared visualization components
│   │       ├── 📄 relationship-graph.tsx  # D3.js force-directed graph
│   │       ├── 📄 zoom-controls.tsx       # Zoom in/out controls
│   │       └── 📄 legend.tsx      # Visual legends and guides
│   │
│   ├── 📁 lib/                    # Utility libraries and services
│   │   ├── 📁 db/                 # Database layer
│   │   │   ├── 📄 index.ts        # Database connection
│   │   │   ├── 📄 queries.ts      # Common database queries
│   │   │   └── 📄 migrations.ts   # Database migration utilities
│   │   │
│   │   ├── 📁 vector/             # Vector search utilities
│   │   │   ├── 📄 embeddings.ts   # OpenAI embedding generation
│   │   │   ├── 📄 similarity.ts   # Cosine similarity calculations
│   │   │   └── 📄 search.ts       # Vector search functions
│   │   │
│   │   ├── 📁 types/              # TypeScript type definitions
│   │   │   ├── 📄 entities.ts     # Entity type definitions
│   │   │   ├── 📄 database.ts     # Database schema types
│   │   │   ├── 📄 api.ts          # API response types
│   │   │   └── 📄 components.ts   # Component prop types
│   │   │
│   │   ├── 📁 utils/              # Utility functions
│   │   │   ├── 📄 cn.ts           # className utility (clsx + tailwind-merge)
│   │   │   ├── 📄 formatters.ts   # Date/number formatting
│   │   │   ├── 📄 validators.ts   # Input validation
│   │   │   ├── 📄 constants.ts    # App constants
│   │   │   └── 📄 helpers.ts      # General helper functions
│   │   │
│   │   ├── 📁 api/                # API client functions
│   │   │   ├── 📄 entities.ts     # Entity-related API calls
│   │   │   ├── 📄 search.ts       # Search API calls
│   │   │   ├── 📄 timeline.ts     # Timeline data fetching
│   │   │   └── 📄 client.ts       # Base API client setup
│   │   │
│   │   └── 📁 hooks/              # Custom React hooks
│   │       ├── 📄 use-entities.ts # Entity data fetching hooks
│   │       ├── 📄 use-search.ts   # Search functionality hooks
│   │       ├── 📄 use-timeline.ts # Timeline state management
│   │       └── 📄 use-vector-search.ts # Vector search hooks
│   │
│   ├── 📁 stores/                 # Global state management (Zustand)
│   │   ├── 📄 app-store.ts        # Main app state (layer toggle, selected entity)
│   │   ├── 📄 search-store.ts     # Search state and filters
│   │   ├── 📄 timeline-store.ts   # Timeline zoom and navigation state
│   │   └── 📄 ui-store.ts         # UI state (sidebars, modals)
│   │
│   └── 📁 db/                     # Database schema and operations
│       ├── 📁 schema/             # Drizzle ORM schema definitions
│       │   ├── 📄 entities.ts     # Main entities table
│       │   ├── 📄 relationships.ts # Entity relationships
│       │   ├── 📄 texts.ts        # Sanskrit texts and verses
│       │   ├── 📄 sources.ts      # Source materials
│       │   └── 📄 index.ts        # Schema exports
│       │
│       ├── 📁 migrations/         # Database migrations (auto-generated)
│       │   ├── 📄 0000_initial.sql
│       │   ├── 📄 0001_add_vectors.sql
│       │   └── 📁 meta/
│       │
│       └── 📁 seed/               # Database seeding scripts
│           ├── 📄 index.ts        # Main seed script
│           ├── 📄 lokas.ts        # Loka entities data
│           ├── 📄 yugas.ts        # Yuga entities data
│           ├── 📄 sources.ts      # Source materials data
│           └── 📄 relationships.ts # Initial relationships
│
├── 📁 scripts/                    # Build and utility scripts
│   ├── 📄 generate-embeddings.ts  # Generate vector embeddings
│   ├── 📄 import-texts.ts         # Import Sanskrit texts
│   ├── 📄 validate-data.ts        # Data validation scripts
│   └── 📄 deploy.sh               # Deployment script
│
├── 📁 docs/                       # Documentation
│   ├── 📄 README.md               # Main project documentation
│   ├── 📄 API.md                  # API documentation
│   ├── 📄 CONTRIBUTING.md         # Contribution guidelines
│   ├── 📄 DATA_SOURCES.md         # Source attribution
│   └── 📁 schema/                 # Database schema documentation
│
├── 📄 .env.local                  # Local environment variables
├── 📄 .env.example                # Environment variables template
├── 📄 .gitignore                  # Git ignore rules
├── 📄 .eslintrc.json              # ESLint configuration
├── 📄 next.config.mjs             # Next.js configuration
├── 📄 tailwind.config.ts          # Tailwind CSS configuration
├── 📄 tsconfig.json               # TypeScript configuration
├── 📄 drizzle.config.ts           # Drizzle ORM configuration
├── 📄 package.json                # Dependencies and scripts
├── 📄 package-lock.json           # Dependency lockfile
└── 📄 README.md                   # Project overview


kalachakra/
├── 📁 .next/                      # Next.js build output (auto-generated)
├── 📁 .git/                       # Git repository files
├── 📁 node_modules/               # Dependencies (auto-generated)
│
├── 📁 public/                     # Static assets served from root
│   ├── 🖼️ favicon.ico
│   ├── 🖼️ logo.svg
│   └── 📁 images/
│       ├── lokas/                 # Loka visualization assets
│       ├── timeline/              # Timeline icons and graphics
│       └── sources/               # Scanned manuscript pages
│
├── 📁 src/                        # Main application source code
│   ├── 📁 app/                    # Next.js App Router (main application)
│   │   ├── 📄 layout.tsx          # Root layout component
│   │   ├── 📄 page.tsx            # Home page (main dashboard)
│   │   ├── 📄 loading.tsx         # Global loading UI
│   │   ├── 📄 error.tsx           # Global error UI
│   │   ├── 📄 not-found.tsx       # 404 page
│   │   ├── 📄 globals.css         # Global styles
│   │   ├── 📄 providers.tsx       # Context providers (React Query, etc.)
│   │   │
│   │   ├── 📁 api/                # API routes (backend endpoints)
│   │   │   ├── 📁 entities/
│   │   │   │   ├── 📄 route.ts    # GET /api/entities (list all)
│   │   │   │   └── 📁 [slug]/
│   │   │   │       └── 📄 route.ts # GET /api/entities/:slug (entity details)
│   │   │   ├── 📁 search/
│   │   │   │   └── 📄 route.ts    # GET /api/search (hybrid search)
│   │   │   ├── 📁 timeline/
│   │   │   │   └── 📄 route.ts    # GET /api/timeline (timeline data)
│   │   │   ├── 📁 relationships/
│   │   │   │   └── 📄 route.ts    # GET /api/relationships (entity connections)
│   │   │   └── 📁 embeddings/
│   │   │       └── 📄 route.ts    # POST /api/embeddings (generate vectors)
│   │   │
│   │   ├── 📁 entities/           # Entity detail pages
│   │   │   ├── 📄 page.tsx        # Entities list page
│   │   │   └── 📁 [slug]/
│   │   │       └── 📄 page.tsx    # Individual entity page
│   │   │
│   │   ├── 📁 timeline/           # Timeline explorer page
│   │   │   └── 📄 page.tsx
│   │   │
│   │   ├── 📁 map/                # 3D Loka map page
│   │   │   └── 📄 page.tsx
│   │   │
│   │   ├── 📁 search/             # Search results page
│   │   │   └── 📄 page.tsx
│   │   │
│   │   └── 📁 about/              # About and documentation
│   │       └── 📄 page.tsx
│   │
│   ├── 📁 components/             # Reusable UI components
│   │   ├── 📁 ui/                 # Base UI components (shadcn/ui style)
│   │   │   ├── 📄 button.tsx
│   │   │   ├── 📄 input.tsx
│   │   │   ├── 📄 card.tsx
│   │   │   ├── 📄 badge.tsx
│   │   │   ├── 📄 toggle.tsx      # For mythic/modern switch
│   │   │   ├── 📄 sheet.tsx       # Side panels
│   │   │   ├── 📄 tooltip.tsx
│   │   │   └── 📄 dialog.tsx
│   │   │
│   │   ├── 📁 layout/             # Layout components
│   │   │   ├── 📄 header.tsx      # Top navigation
│   │   │   ├── 📄 sidebar.tsx     # Entity detail panel
│   │   │   ├── 📄 footer.tsx
│   │   │   └── 📄 navigation.tsx  # Main navigation menu
│   │   │
│   │   ├── 📁 timeline/           # Timeline visualization components
│   │   │   ├── 📄 timeline-explorer.tsx    # Main timeline component
│   │   │   ├── 📄 timeline-controls.tsx    # Zoom/navigation controls
│   │   │   ├── 📄 yuga-band.tsx           # Yuga timeline bands
│   │   │   ├── 📄 manvantara-section.tsx  # Manvantara sections
│   │   │   └── 📄 kalpa-overview.tsx      # Kalpa level view
│   │   │
│   │   ├── 📁 loka-map/           # 3D cosmic map components
│   │   │   ├── 📄 loka-map.tsx    # Main 3D scene
│   │   │   ├── 📄 loka-sphere.tsx # Individual loka representations
│   │   │   ├── 📄 camera-controls.tsx     # 3D navigation
│   │   │   ├── 📄 loka-labels.tsx # Text labels and descriptions
│   │   │   └── 📄 cosmic-axis.tsx # Central axis (Mount Meru)
│   │   │
│   │   ├── 📁 search/             # Search-related components
│   │   │   ├── 📄 search-bar.tsx  # Global search input
│   │   │   ├── 📄 search-results.tsx      # Results display
│   │   │   ├── 📄 search-filters.tsx      # Filter by entity type
│   │   │   └── 📄 semantic-suggestions.tsx # AI-powered suggestions
│   │   │
│   │   ├── 📁 entity/             # Entity-specific components
│   │   │   ├── 📄 entity-card.tsx # Entity preview cards
│   │   │   ├── 📄 entity-detail.tsx       # Detailed entity view
│   │   │   ├── 📄 entity-relationships.tsx # Relationship graph
│   │   │   ├── 📄 citation-list.tsx       # Source citations
│   │   │   └── 📄 verse-display.tsx       # Sanskrit verse formatting
│   │   │
│   │   ├── 📁 text/               # Text and typography components
│   │   │   ├── 📄 devanagari-text.tsx     # Devanagari script display
│   │   │   ├── 📄 iast-text.tsx   # IAST transliteration
│   │   │   ├── 📄 verse-card.tsx  # Individual verse display
│   │   │   └── 📄 translation-toggle.tsx  # Switch between translations
│   │   │
│   │   └── 📁 visualization/      # Shared visualization components
│   │       ├── 📄 relationship-graph.tsx  # D3.js force-directed graph
│   │       ├── 📄 zoom-controls.tsx       # Zoom in/out controls
│   │       └── 📄 legend.tsx      # Visual legends and guides
│   │
│   ├── 📁 lib/                    # Utility libraries and services
│   │   ├── 📁 db/                 # Database layer
│   │   │   ├── 📄 index.ts        # Database connection
│   │   │   ├── 📄 queries.ts      # Common database queries
│   │   │   └── 📄 migrations.ts   # Database migration utilities
│   │   │
│   │   ├── 📁 vector/             # Vector search utilities
│   │   │   ├── 📄 embeddings.ts   # OpenAI embedding generation
│   │   │   ├── 📄 similarity.ts   # Cosine similarity calculations
│   │   │   └── 📄 search.ts       # Vector search functions
│   │   │
│   │   ├── 📁 types/              # TypeScript type definitions
│   │   │   ├── 📄 entities.ts     # Entity type definitions
│   │   │   ├── 📄 database.ts     # Database schema types
│   │   │   ├── 📄 api.ts          # API response types
│   │   │   └── 📄 components.ts   # Component prop types
│   │   │
│   │   ├── 📁 utils/              # Utility functions
│   │   │   ├── 📄 cn.ts           # className utility (clsx + tailwind-merge)
│   │   │   ├── 📄 formatters.ts   # Date/number formatting
│   │   │   ├── 📄 validators.ts   # Input validation
│   │   │   ├── 📄 constants.ts    # App constants
│   │   │   └── 📄 helpers.ts      # General helper functions
│   │   │
│   │   ├── 📁 api/                # API client functions
│   │   │   ├── 📄 entities.ts     # Entity-related API calls
│   │   │   ├── 📄 search.ts       # Search API calls
│   │   │   ├── 📄 timeline.ts     # Timeline data fetching
│   │   │   └── 📄 client.ts       # Base API client setup
│   │   │
│   │   └── 📁 hooks/              # Custom React hooks
│   │       ├── 📄 use-entities.ts # Entity data fetching hooks
│   │       ├── 📄 use-search.ts   # Search functionality hooks
│   │       ├── 📄 use-timeline.ts # Timeline state management
│   │       └── 📄 use-vector-search.ts # Vector search hooks
│   │
│   ├── 📁 stores/                 # Global state management (Zustand)
│   │   ├── 📄 app-store.ts        # Main app state (layer toggle, selected entity)
│   │   ├── 📄 search-store.ts     # Search state and filters
│   │   ├── 📄 timeline-store.ts   # Timeline zoom and navigation state
│   │   └── 📄 ui-store.ts         # UI state (sidebars, modals)
│   │
│   └── 📁 db/                     # Database schema and operations
│       ├── 📁 schema/             # Drizzle ORM schema definitions
│       │   ├── 📄 entities.ts     # Main entities table
│       │   ├── 📄 relationships.ts # Entity relationships
│       │   ├── 📄 texts.ts        # Sanskrit texts and verses
│       │   ├── 📄 sources.ts      # Source materials
│       │   └── 📄 index.ts        # Schema exports
│       │
│       ├── 📁 migrations/         # Database migrations (auto-generated)
│       │   ├── 📄 0000_initial.sql
│       │   ├── 📄 0001_add_vectors.sql
│       │   └── 📄 meta/
│       │
│       └── 📁 seed/               # Database seeding scripts
│           ├── 📄 index.ts        # Main seed script
│           ├── 📄 lokas.ts        # Loka entities data
│           ├── 📄 yugas.ts        # Yuga entities data
│           ├── 📄 sources.ts      # Source materials data
│           └── 📄 relationships.ts # Initial relationships
│
├── 📁 scripts/                    # Build and utility scripts
│   ├── 📄 generate-embeddings.ts  # Generate vector embeddings
│   ├── 📄 import-texts.ts         # Import Sanskrit texts
│   ├── 📄 validate-data.ts        # Data validation scripts
│   └── 📄 deploy.sh               # Deployment script
│
├── 📁 docs/                       # Documentation
│   ├── 📄 README.md               # Main project documentation
│   ├── 📄 API.md                  # API documentation
│   ├── 📄 CONTRIBUTING.md         # Contribution guidelines
│   ├── 📄 DATA_SOURCES.md         # Source attribution
│   └── 📁 schema/                 # Database schema documentation
│
├── 📄 .env.local                  # Local environment variables
├── 📄 .env.example                # Environment variables template
├── 📄 .gitignore                  # Git ignore rules
├── 📄 .eslintrc.json              # ESLint configuration
├── 📄 next.config.mjs             # Next.js configuration
├── 📄 tailwind.config.ts          # Tailwind CSS configuration
├── 📄 tsconfig.json               # TypeScript configuration
├── 📄 drizzle.config.ts           # Drizzle ORM configuration
├── 📄 package.json                # Dependencies and scripts
├── 📄 package-lock.json           # Dependency lockfile
└── 📄 README.md                   # Project overview
