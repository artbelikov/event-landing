import React from 'react';

interface TopPagesChartProps {
  data: Array<{ page: string; views: number }>;
}

export function TopPagesChart({ data }: TopPagesChartProps) {
  const maxViews = Math.max(...data.map(item => item.views));

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
            {index + 1}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-900 truncate">
                {item.page}
              </span>
              <span className="text-sm text-gray-600">
                {item.views.toLocaleString()}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(item.views / maxViews) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 