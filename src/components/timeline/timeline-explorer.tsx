// src/components/timeline/timeline-explorer.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useAppStore } from '@/stores/app-store';
import { useRouter } from 'next/navigation';

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

interface TimelineData {
  data: TimelineBand[];
  totalDuration: number;
  layer: string;
}

export function TimelineExplorer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [timelineData, setTimelineData] = useState<TimelineData | null>(null);
  const [loading, setLoading] = useState(true);
  const { currentLayer, setSelectedEntityId, setSidebarOpen } = useAppStore();
  const router = useRouter();

  // Fetch timeline data
  useEffect(() => {
    async function fetchTimeline() {
      try {
        setLoading(true);
        const response = await fetch(`/api/timeline?layer=${currentLayer}`);
        const data = await response.json();
        
        if (data.success) {
          setTimelineData(data);
        }
      } catch (error) {
        console.error('Failed to fetch timeline:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTimeline();
  }, [currentLayer]);

  // D3 visualization
  useEffect(() => {
    if (!timelineData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    const margin = { top: 60, right: 40, bottom: 60, left: 100 };
    const width = 1000 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain([0, timelineData.totalDuration])
      .range([0, width]);

    const yScale = d3
      .scaleBand()
      .domain(['yugas'])
      .range([0, height])
      .padding(0.3);

    // Create tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'timeline-tooltip')
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('font-size', '12px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('z-index', 1000);

    // Draw yuga bands
    const bands = g
      .selectAll('.yuga-band')
      .data(timelineData.data)
      .enter()
      .append('rect')
      .attr('class', 'yuga-band')
      .attr('x', d => xScale(d.start))
      .attr('y', yScale('yugas')!)
      .attr('width', d => xScale(d.duration))
      .attr('height', yScale.bandwidth())
      .attr('fill', d => d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this).attr('opacity', 0.8);
        
        const formatNumber = (num: number) => {
          if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
          } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
          }
          return num.toLocaleString();
        };

        tooltip.transition().duration(200).style('opacity', 1);
        tooltip
          .html(`
            <strong>${d.nameIast}</strong><br/>
            ${d.nameDevanagari ? `<em>${d.nameDevanagari}</em><br/>` : ''}
            Duration: ${formatNumber(d.duration)} years<br/>
            <small>${d.summary}</small>
          `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this).attr('opacity', 1);
        tooltip.transition().duration(200).style('opacity', 0);
      })
      // .on('click', function(event, d) {
      //   setSelectedEntityId(d.id);
      //   setSidebarOpen(true);
      // });
      .on('click', function(event, d) {
        router.push(`/entities/${d.slug}`);
      });
    
    // Add labels
    g.selectAll('.yuga-label')
      .data(timelineData.data)
      .enter()
      .append('text')
      .attr('class', 'yuga-label')
      .attr('x', d => xScale(d.start + d.duration / 2))
      .attr('y', yScale('yugas')! + yScale.bandwidth() / 2)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('fill', d => d.color === '#FFD700' ? '#000' : '#fff')
      .style('font-weight', 'bold')
      .style('font-size', '14px')
      .style('pointer-events', 'none')
      .text(d => d.name);

    // Add x-axis
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d => {
        const num = d as number;
        if (num >= 1000000) {
          return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
          return (num / 1000).toFixed(0) + 'K';
        }
        return num.toLocaleString();
      });

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .append('text')
      .attr('x', width / 2)
      .attr('y', 40)
      .attr('fill', '#666')
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .text(`Years (${currentLayer.toLowerCase()} perspective)`);

    // Add title
    g.append('text')
      .attr('x', width / 2)
      .attr('y', -30)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('fill', '#7c2d12')
      .text('The Four Yugas - Cycles of Time');

    // Cleanup function
    return () => {
      tooltip.remove();
    };
  }, [timelineData, currentLayer, setSelectedEntityId, setSidebarOpen]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-amber-600">Loading timeline...</div>
      </div>
    );
  }

  if (!timelineData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">Failed to load timeline data</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-amber-200">
        <svg
          ref={svgRef}
          width="1000"
          height="200"
          className="w-full h-auto"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        
        <div className="mt-4 text-sm text-amber-700">
          <p>
            <strong>Interactive Timeline:</strong> Hover over each yuga to see details, 
            click to open full information. Currently showing <strong>{currentLayer}</strong> perspective.
          </p>
          {currentLayer === 'MYTHIC' && (
            <p className="mt-2">
              <em>Divine years:</em> Traditional scriptural time scales where each divine year equals one human year.
            </p>
          )}
          {currentLayer === 'MODERN' && (
            <p className="mt-2">
              <em>Human years:</em> Converted to human time scale (1 divine year = 360 human years).
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
