// src/app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { entities } from '@/db/schema';
import { or, ilike, eq, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const type = searchParams.get('type');
  const related = searchParams.get('related'); // For future "find related" functionality
  
  if (!query) {
    return NextResponse.json({
      success: false,
      error: 'Query parameter "q" is required'
    }, { status: 400 });
  }

  try {
    const searchTerm = `%${query}%`;
    
    // Build the where conditions
    let whereConditions = [
      ilike(entities.nameIast, searchTerm),
      ilike(entities.summary, searchTerm)
    ];

    // Add nameDevanagari search if it exists
    whereConditions.push(ilike(entities.nameDevanagari, searchTerm));

    let dbQuery = db
      .select()
      .from(entities)
      .where(or(...whereConditions));

    // Filter by type if specified
    if (type) {
      dbQuery = db
        .select()
        .from(entities)
        .where(
          and(
            or(...whereConditions),
            eq(entities.type, type as any)
          )
        );
    }

    const results = await dbQuery;

    // Group results by type
    const groupedResults = results.reduce((acc, entity) => {
      const entityType = entity.type;
      if (!acc[entityType]) {
        acc[entityType] = [];
      }
      acc[entityType].push(entity);
      return acc;
    }, {} as Record<string, typeof results>);

    return NextResponse.json({
      success: true,
      query: query,
      results: results,
      groupedResults: groupedResults,
      count: results.length,
      mode: 'keyword' // Will be useful when we add semantic search
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { success: false, error: 'Search failed' }, 
      { status: 500 }
    );
  }
}
