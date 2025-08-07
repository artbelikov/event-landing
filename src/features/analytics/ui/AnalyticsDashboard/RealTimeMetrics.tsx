import React from 'react';
import { RealTimeMetrics as RealTimeMetricsType } from '@/entities/analytics';

interface RealTimeMetricsProps {
  data: RealTimeMetricsType;
}

export function RealTimeMetrics({ data }: RealTimeMetricsProps) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Real-Time Metrics</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold">{data.activeUsers}</div>
          <div className="text-sm opacity-90">Active Users</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold">{data.pageViewsLastHour}</div>
          <div className="text-sm opacity-90">Page Views (Last Hour)</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold">{data.conversionsLastHour}</div>
          <div className="text-sm opacity-90">Conversions (Last Hour)</div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Top Pages (Live)</h3>
        <div className="space-y-2">
          {data.topPages.map((page, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm opacity-90">{page.page}</span>
              <span className="text-sm font-semibold">{page.views} views</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-xs opacity-75">
        Last updated: {new Date(data.lastUpdated).toLocaleTimeString()}
      </div>
    </div>
  );
} 