import React from 'react';
import { TimeInZone } from '../types';

interface HeartRateZonesProps {
  timeInZones: { [key: string]: TimeInZone };
}

const HeartRateZones: React.FC<HeartRateZonesProps> = ({ timeInZones }) => {
  return (
    <>
      <h4 className="text-md leading-6 font-medium text-gray-900 mt-4">Heart Rate Zones:</h4>
      <div className="text-left mt-2">
        {Object.entries(timeInZones).map(([zone, data]) => (
          <p key={zone} className="text-sm text-gray-500">
            Zone {data.zoneNumber}: {data.secsInZone} seconds (Low Boundary: {data.zoneLowBoundary})
          </p>
        ))}
      </div>
    </>
  );
};

export default HeartRateZones;
