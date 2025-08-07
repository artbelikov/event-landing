import React from 'react';
import { useConversionFunnel } from '@/entities/analytics';

interface ConversionFunnelProps {
  conferenceId: number;
  startDate: string;
  endDate: string;
}

export function ConversionFunnel({ conferenceId, startDate, endDate }: ConversionFunnelProps) {
  const { data: funnelData, isLoading } = useConversionFunnel(conferenceId, startDate, endDate);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!funnelData || funnelData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No conversion funnel data available for this period.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {funnelData.map((stage, index) => (
        <div key={index} className="relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{stage.stage}</div>
                <div className="text-xs text-gray-500">
                  {stage.conversionRate.toFixed(1)}% conversion rate
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">
                {stage.count.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">users</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${stage.conversionRate}%` }}
            ></div>
          </div>
          
          {index < funnelData.length - 1 && (
            <div className="absolute left-4 top-12 w-0.5 h-4 bg-gray-300"></div>
          )}
        </div>
      ))}
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="text-sm text-blue-800">
          <strong>Total Conversion Rate:</strong> {funnelData[funnelData.length - 1]?.conversionRate.toFixed(1)}%
        </div>
        <div className="text-xs text-blue-600 mt-1">
          From {funnelData[0]?.count.toLocaleString()} initial visitors to {funnelData[funnelData.length - 1]?.count.toLocaleString()} conversions
        </div>
      </div>
    </div>
  );
} 