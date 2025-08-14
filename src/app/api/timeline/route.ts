// src/app/api/timeline/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { entities, entityDetails } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

interface TimelineBand {
  id: string;
  slug: string;
  name: string;
  nameIast: string;
  nameDevanagari?: string;
  summary?: string;
  start: number;
  end: number;
  duration: number;
  layer: string;
  color: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const layer = searchParams.get('layer') || 'MYTHIC';
  
  try {
    // Get all yugas
    const yugas = await db
      .select()
      .from(entities)
      .where(eq(entities.type, 'YUGA'));
    
    // Get duration details for each yuga
    const timelineBands: TimelineBand[] = [];
    let currentStart = 0;
    
    // Define yuga order and colors
    const yugaOrder = ['satya-yuga', 'treta-yuga', 'dvapara-yuga', 'kali-yuga'];
    const yugaColors = {
      'satya-yuga': '#FFD700',   // Gold
      'treta-yuga': '#C0C0C0',   // Silver  
      'dvapara-yuga': '#CD7F32', // Bronze
      'kali-yuga': '#2F4F4F'     // Dark slate gray
    };
    
    for (const yugaSlug of yugaOrder) {
      const yuga = yugas.find(y => y.slug === yugaSlug);
      if (!yuga) continue;
      
      // Get duration details for this layer
      const durationKey = layer === 'MYTHIC' ? 'duration_years' : 'duration_human_years';
      const durationDetails = await db
        .select()
        .from(entityDetails)
        .where(
          and(
            eq(entityDetails.entityId, yuga.id),
            eq(entityDetails.key, durationKey),
            eq(entityDetails.layer, layer as any)
          )
        )
        .limit(1);
      
      let duration = 1000000; // Default fallback
      if (durationDetails.length > 0) {
        const durationData = durationDetails[0].value as any;
        duration = durationData.years || 1000000;
      }
      
      timelineBands.push({
        id: yuga.id,
        slug: yuga.slug,
        name: yuga.nameIast,
        nameIast: yuga.nameIast,
        nameDevanagari: yuga.nameDevanagari,
        summary: yuga.summary,
        start: currentStart,
        end: currentStart + duration,
        duration: duration,
        layer: layer,
        color: yugaColors[yugaSlug as keyof typeof yugaColors] || '#888888'
      });
      
      currentStart += duration;
    }
    
    return NextResponse.json({
      success: true,
      data: timelineBands,
      totalDuration: currentStart,
      layer: layer,
      count: timelineBands.length
    });
  } catch (error) {
    console.error('Timeline API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch timeline data' }, 
      { status: 500 }
    );
  }
}
