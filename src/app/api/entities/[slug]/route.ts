// src/app/api/entities/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { entities, entityDetails, sanskritTexts, sources } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);
  const layer = searchParams.get('layer') || 'MYTHIC';
  
  try {
    // Get the entity
    const entity = await db
      .select()
      .from(entities)
      .where(eq(entities.slug, params.slug))
      .limit(1);
    
    if (entity.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Entity not found' }, 
        { status: 404 }
      );
    }
    
    // Get entity details for the specified layer
    const details = await db
      .select()
      .from(entityDetails)
      .where(
        eq(entityDetails.entityId, entity[0].id)
      );
    
    // Filter details by layer
    const layerDetails = details.filter(detail => detail.layer === layer);
    
    return NextResponse.json({
      success: true,
      data: {
        ...entity[0],
        details: layerDetails
      },
      layer: layer
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch entity' }, 
      { status: 500 }
    );
  }
}
