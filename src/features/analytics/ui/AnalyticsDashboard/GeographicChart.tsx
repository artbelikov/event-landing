import React from 'react';

interface GeographicChartProps {
  data: Array<{ country: string; city: string; count: number; percentage: number }>;
}

export function GeographicChart({ data }: GeographicChartProps) {
  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold">
              🌍
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-900">
                {item.city}, {item.country}
              </div>
              <div className="text-xs text-gray-500">
                {item.percentage.toFixed(1)}% of total visitors
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-900">
              {item.count.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">visitors</div>
          </div>
        </div>
      ))}
    </div>
  );
} 