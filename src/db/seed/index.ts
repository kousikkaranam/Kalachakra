// src/db/seed/index.ts
import { config } from 'dotenv';
import { db } from '@/lib/db';
import { entities, sources, entityDetails } from '@/db/schema';
import { InferInsertModel } from 'drizzle-orm';

// Load environment variables from .env.local
config({ path: '.env.local' });

type NewEntity = InferInsertModel<typeof entities>;


const lokas: NewEntity[] = [
  {
    type: 'LOKA' as const,
    slug: 'satya-loka',
    nameIast: 'Satyaloka',
    nameDevanagari: 'सत्यलोक',
    summary: 'The highest of the seven upper worlds, abode of Brahmā',
  },
  {
    type: 'LOKA' as const,
    slug: 'tapa-loka',
    nameIast: 'Tapaloka',
    nameDevanagari: 'तपलोक',
    summary: 'Realm of great sages and ascetics who have transcended material desires',
  },
  {
    type: 'LOKA' as const,
    slug: 'jana-loka',
    nameIast: 'Janaloka',
    nameDevanagari: 'जनलोक',
    summary: 'World of beings born through mental power, realm of Brahmā\'s sons',
  },
  {
    type: 'LOKA' as const,
    slug: 'mahar-loka',
    nameIast: 'Maharloka',
    nameDevanagari: 'महर्लोक',
    summary: 'Great world, dwelling of great sages like Bhṛgu',
  },
  {
    type: 'LOKA' as const,
    slug: 'svar-loka',
    nameIast: 'Svarloka',
    nameDevanagari: 'स्वर्लोक',
    summary: 'Heaven, realm of the gods and celestial beings',
  },
  {
    type: 'LOKA' as const,
    slug: 'bhuvar-loka',
    nameIast: 'Bhuvarloka',
    nameDevanagari: 'भुवर्लोक',
    summary: 'Intermediate world, atmospheric realm between earth and heaven',
  },
  {
    type: 'LOKA' as const,
    slug: 'bhu-loka',
    nameIast: 'Bhūloka',
    nameDevanagari: 'भूलोक',
    summary: 'Earth realm, the physical world we inhabit',
  },

  // Lower 7 (Adho Lokas / Patalas) - New additions
  {
    type: 'LOKA' as const,
    slug: 'atala-loka',
    nameIast: 'Atalaloka',
    nameDevanagari: 'अतललोक',
    summary:
      'Realm of illusion and material pleasures, inhabited by demons and nagas.',
  },
  {
    type: 'LOKA' as const,
    slug: 'vitala-loka',
    nameIast: 'Vitalaloka',
    nameDevanagari: 'वितललोक',
    summary:
      'Realm of gold and precious metals, associated with Lord Shiva as Hatakeshvara.',
  },
  {
        type: 'LOKA' as const,

    slug: 'sutala-loka',
    nameIast: 'Sutalaloka',
    nameDevanagari: 'सुतललोक',
    summary:
      'Realm of Bali Maharaja, protected from Indra, known for its splendor.',
  },
  {
    type: 'LOKA' as const,

    slug: 'talatala-loka',
    nameIast: 'Talatalaloka',
    nameDevanagari: 'तलातललोक',
    summary: 'Realm governed by Maya Danava, architect of the demons.',
  },
  {
    type: 'LOKA' as const,

    slug: 'mahatala-loka',
    nameIast: 'Mahatalaloka',
    nameDevanagari: 'महातललोक',
    summary: 'Realm of many-hooded serpents and fierce beings.',
  },
  {
    type: 'LOKA' as const,

    slug: 'rasatala-loka',
    nameIast: 'Rasatalaloka',
    nameDevanagari: 'रसातललोक',
    summary: 'Realm of daityas and danavas, enemies of the devas.',
  },
  {
    type: 'LOKA' as const,

    slug: 'patala-loka',
    nameIast: 'Patalaloka',
    nameDevanagari: 'पाताललोक',
    summary: 'Lowest realm, abode of nagas and serpents, rich in jewels.',
  },
];

const yugas = [
  {
    type: 'YUGA' as const,
    slug: 'satya-yuga',
    nameIast: 'Satyayuga',
    nameDevanagari: 'सत्ययुग',
    summary: 'The golden age of truth and righteousness, lasting 1,728,000 years',
  },
  {
    type: 'YUGA' as const,
    slug: 'treta-yuga',
    nameIast: 'Tretāyuga',
    nameDevanagari: 'त्रेतायुग',
    summary: 'The silver age, when sacrifice begins, lasting 1,296,000 years',
  },
  {
    type: 'YUGA' as const,
    slug: 'dvapara-yuga',
    nameIast: 'Dvāparayuga',
    nameDevanagari: 'द्वापरयुग',
    summary: 'The bronze age, when virtue declines, lasting 864,000 years',
  },
  {
    type: 'YUGA' as const,
    slug: 'kali-yuga',
    nameIast: 'Kaliyuga',
    nameDevanagari: 'कलियुग',
    summary: 'The iron age of darkness and discord, lasting 432,000 years',
  },
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Debug: Check if environment variable is loaded
    if (!process.env.POSTGRES_URL) {
      throw new Error('POSTGRES_URL environment variable is not set. Check your .env.local file.');
    }
    
    console.log('✅ Database URL loaded successfully');

    // Clear existing data (be careful in production!)
    await db.delete(entityDetails);
    await db.delete(entities);
    await db.delete(sources);

    // Insert a sample source
    console.log('📚 Inserting sources...');
    await db.insert(sources).values([
      {
        slug: 'vishnu-purana-wilson',
        title: 'The Vishnu Purana',
        authorTranslator: 'H.H. Wilson',
        editionYear: '1840',
        license: 'Public Domain',
        url: 'https://archive.org/details/vishnupurana00wils',
      },
    ]);

    // Insert lokas
    console.log('🏔️ Inserting lokas...');
    const insertedLokas = await db.insert(entities).values(lokas).onConflictDoNothing();

    // Insert yugas  
    console.log('⏰ Inserting yugas...');
    const insertedYugas = await db.insert(entities).values(yugas).returning();

    // Add some details for yugas (duration in years)
    console.log('📊 Adding yuga details...');
    const yugaDurations = [
      { slug: 'satya-yuga', duration: 1728000 },
      { slug: 'treta-yuga', duration: 1296000 },
      { slug: 'dvapara-yuga', duration: 864000 },
      { slug: 'kali-yuga', duration: 432000 },
    ];

    for (const yuga of insertedYugas) {
      const duration = yugaDurations.find(y => y.slug === yuga.slug)!;
      
      await db.insert(entityDetails).values([
        {
          entityId: yuga.id,
          key: 'duration_years',
          value: { years: duration.duration, type: 'divine_years' },
          layer: 'MYTHIC',
        },
        {
          entityId: yuga.id,
          key: 'duration_human_years',
          value: { years: duration.duration * 360, note: 'Each divine year = 360 human years' },
          layer: 'MODERN',
        },
      ]);
    }

    console.log('✅ Database seeding completed successfully!');
    console.log(`📊 Inserted ${insertedLokas.length} lokas and ${insertedYugas.length} yugas`);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export { seedDatabase };
