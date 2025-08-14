// src/app/api/entities/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { entities, entityDetails } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const layer = searchParams.get('layer') || 'MYTHIC';
  
  try {
    let query = db
      .select({
        id: entities.id,
        type: entities.type,
        slug: entities.slug,
        nameIast: entities.nameIast,
        nameDevanagari: entities.nameDevanagari,
        summary: entities.summary,
        createdAt: entities.createdAt,
      })
      .from(entities);
    
    if (type) {
      query = query.where(eq(entities.type, type as any));
    }
    
    const results = await query;
    
    return NextResponse.json({
      success: true,
      data: results,
      count: results.length,
      layer: layer
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch entities' }, 
      { status: 500 }
    );
  }
}
