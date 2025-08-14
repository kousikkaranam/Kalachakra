<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Vedic Cosmology Atlas - Complete Implementation Guide

An interactive web application for exploring Vedic cosmology with vector-powered search, featuring lokas, yugas, manvantaras, timelines, relationships, and sourced verses with mythic vs. modern cosmology views.

## 🏗️ Architecture Overview

- **Frontend**: Next.js 15 with React, TypeScript, Tailwind CSS
- **Database**: PostgreSQL with pgvector extension for vector search
- **ORM**: Drizzle ORM for type-safe database operations
- **Vector Search**: OpenAI embeddings + PostgreSQL vector operations
- **Hosting**: Vercel (frontend) + Neon/Railway (database) - **100% Free**


## 📋 Prerequisites

- Node.js 18+ and npm
- Git
- OpenAI API key (for embeddings)
- Neon or Railway account (free PostgreSQL hosting)


## 🚀 Complete Setup Process

### Phase 1: Project Foundation (30 minutes)

#### Step 1: Initialize Next.js Project

```bash
# Navigate to your cloned repo
cd your-repo-name

# Initialize Next.js with all required configurations
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Install core dependencies
npm install drizzle-orm drizzle-kit pg @types/pg
npm install zustand @tanstack/react-query
npm install lucide-react class-variance-authority clsx tailwind-merge

# Install vector search dependencies
npm install openai
npm install d3 @types/d3 three @react-three/fiber @react-three/drei

# Install development dependencies
npm install -D dotenv tsx
```


#### Step 2: Setup Database (Free PostgreSQL)

1. **Option A - Neon (Recommended)**:
    - Go to [neon.tech](https://neon.tech) and create free account
    - Create new project called "vedic-cosmology-atlas"
    - Enable pgvector extension in SQL editor: `CREATE EXTENSION vector;`
    - Copy connection string
2. **Option B - Railway**:
    - Go to [railway.app](https://railway.app) and create free account
    - Create PostgreSQL database
    - Enable pgvector extension
    - Copy connection string

#### Step 3: Environment Configuration

```bash
# Create .env.local file
POSTGRES_URL="your_postgresql_connection_string_here"
OPENAI_API_KEY="your_openai_api_key_here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```


### Phase 2: Database Schema \& ORM Setup (45 minutes)

#### Step 4: Drizzle Configuration

```bash
# Create drizzle.config.ts
touch drizzle.config.ts

# Create database schema directory
mkdir -p src/db/{schema,migrations,seed}
```


#### Step 5: Database Schema Implementation

Create the complete PostgreSQL schema with vector support for entities, relationships, and semantic search.

#### Step 6: Database Migration \& Seeding

```bash
# Generate migrations
npm run db:generate

# Push schema to database
npm run db:push

# Seed initial data (lokas, yugas, sources)
npm run db:seed
```


### Phase 3: Core Application Development (2-3 hours)

#### Step 7: State Management Setup

- Zustand store for global app state (current layer, selected entity)
- React Query for server state management and caching


#### Step 8: API Routes Development

- `/api/entities` - List entities with filters
- `/api/entities/[slug]` - Get entity details with relationships
- `/api/search` - Hybrid search (keyword + vector semantic search)
- `/api/timeline` - Timeline data for yugas/manvantaras


#### Step 9: UI Components Development

- **Layout**: Navigation with mythic/modern toggle
- **Timeline**: D3.js zoomable timeline component
- **Entity Detail**: Sidebar with citations and relationships
- **Search**: Global search with semantic capabilities


### Phase 4: Vector Search Implementation (1 hour)

#### Step 10: Embedding Generation Pipeline

- OpenAI integration for text embeddings
- Batch processing for initial data
- Semantic similarity calculations


#### Step 11: Advanced Search Features

- Hybrid search combining PostgreSQL full-text + vector similarity
- Relationship discovery through semantic analysis
- Citation-aware results with source attribution


### Phase 5: Data Curation \& Content (Ongoing)

#### Step 12: Sanskrit Text Processing

- Verse extraction from public domain sources
- IAST transliteration handling
- Citation formatting and source attribution


#### Step 13: Initial Content Seeding

- 14 Lokas with descriptions and relationships
- 4 Yugas with traditional time calculations
- Sample verses from public domain Puranas
- Manvantara and Kalpa basic information


### Phase 6: Deployment (20 minutes)

#### Step 14: Vercel Deployment

```bash
# Connect to Vercel
npm i -g vercel
vercel login
vercel

# Configure environment variables in Vercel dashboard
# Deploy with automatic GitHub integration
```


#### Step 15: Database Production Setup

- Configure production PostgreSQL connection
- Run migrations on production database
- Seed production data


## 📊 Project Structure

```
vedic-cosmology-atlas/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API endpoints
│   │   ├── entities/       # Entity detail pages
│   │   └── timeline/       # Timeline view
│   ├── components/         # React components
│   │   ├── ui/            # Base UI components
│   │   ├── timeline/      # Timeline visualization
│   │   ├── search/        # Search components
│   │   └── entity/        # Entity-related components
│   ├── db/                # Database layer
│   │   ├── schema/        # Drizzle schema definitions
│   │   ├── migrations/    # Database migrations
│   │   └── seed/          # Seed data scripts
│   ├── lib/               # Utilities and services
│   │   ├── vector/        # Vector search utilities
│   │   ├── types/         # TypeScript definitions
│   │   └── utils/         # Helper functions
│   └── stores/            # Zustand state management
├── scripts/               # Build and deployment scripts
└── docs/                 # Documentation
```


## 🔧 Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:generate     # Generate Drizzle migrations
npm run db:push         # Push schema to database
npm run db:seed         # Seed database with initial data
npm run db:studio       # Open Drizzle Studio

# Data Processing
npm run process:texts   # Process Sanskrit texts
npm run generate:embeddings  # Generate vector embeddings
```


## 🎯 Core Features

### Mythic vs Modern Toggle

- **Mythic View**: Preserves traditional cosmographical descriptions and time scales
- **Modern View**: Provides interpretive overlays and astronomical analogies
- **Data Layer**: Each entity can have different presentations per view mode


### Vector-Powered Search

- **Semantic Search**: Find entities by meaning, not just keywords
- **Relationship Discovery**: Automatically discover thematic connections
- **Sanskrit Text Search**: Search across verses with contextual understanding


### Interactive Visualizations

- **3D Loka Map**: Navigate through cosmic realms with Three.js
- **Zoomable Timeline**: Explore vast time scales from Kalpas to Yugas
- **Relationship Graph**: Visualize connections between entities


### Citation System

- **Source Attribution**: Every fact linked to specific verse references
- **Multiple Traditions**: Handle conflicting information across Puranas
- **Scholar Notes**: Interpretive commentary separated from canonical text


## 📚 Data Sources

- **Primary**: Public domain Purana translations (Wilson, Dutt, etc.)
- **Secondary**: Academic commentaries and interpretations
- **Format**: IAST transliteration + Devanagari + English translations
- **Attribution**: Full bibliographic information for all sources


## 🚢 Deployment Strategy

### Free Tier Limits \& Solutions

- **Vercel**: Generous free tier for frontend hosting
- **Neon**: 500MB PostgreSQL with pgvector support
- **OpenAI**: \$5 credit covers initial embedding generation
- **Total Monthly Cost**: \$0 for development, ~\$5-10 for production


### Scaling Path

- **Phase 1**: Free tier deployment for MVP
- **Phase 2**: Upgrade database for more content (\$5-20/month)
- **Phase 3**: CDN and caching for performance optimization


## 🤝 Contributing

This is an open-source scholarly project. Contributions welcome for:

- Sanskrit text digitization and verification
- Translation accuracy improvements
- Additional Purana integration
- UI/UX enhancements
- Performance optimizations


## 📄 License

MIT License - Free for educational and research use

***

**Next Step**: Run through Phase 1 setup (30 minutes) to get your development environment ready, then we'll implement the database schema and core functionality step by step.

<div style="text-align: center">⁂</div>

[^1]: https://www.youtube.com/watch?v=EynGNuFtKeI

[^2]: https://nextjs.org/learn/dashboard-app/setting-up-your-database

[^3]: https://vercel.com/guides/nextjs-prisma-postgres

[^4]: https://www.reddit.com/r/nextjs/comments/r5g6xn/where_should_i_deploy_a_nextjs_postgresql_project/

[^5]: https://www.saffrontech.net/blog/how-to-connect-nextjs-with-postgres-sql

[^6]: https://www.hostingadvice.com/how-to/free-postgresql-hosting/

[^7]: https://strapi.io/blog/how-to-use-drizzle-orm-with-postgresql-in-a-nextjs-15-project

[^8]: https://www.youtube.com/watch?v=2T_Dx7YgBFw

[^9]: https://www.pgsclusters.com/free-postgresql

[^10]: https://www.youtube.com/watch?v=tiSm8ZjFQP0

[^11]: https://aiven.io/developer/deploy-netlify-app-aiven-pg-caching

[^12]: https://www.reddit.com/r/webdev/comments/13x0zgc/free_postgres_database_hosting_sites_suggestions/

[^13]: https://joelolawanle.com/blog/prisma-postgres-nextjs-14

[^14]: https://www.youtube.com/watch?v=lBtvy2WGEdY

[^15]: https://aiven.io/free-postgresql-database

[^16]: https://www.reddit.com/r/nextjs/comments/1c27uyd/nextjs_postgresql_local_development/

[^17]: https://www.koyeb.com/blog/top-postgresql-database-free-tiers-in-2025

[^18]: https://www.dhiwise.com/post/how-to-set-up-a-new-nextjs-project-with-prisma-and-postgres

[^19]: https://www.prisma.io/dataguide/postgresql/5-ways-to-host-postgresql

[^20]: https://www.digitalocean.com/products/managed-databases-postgresql

