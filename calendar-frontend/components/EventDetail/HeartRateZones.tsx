import React from 'react';
import { TimeInZone, TrainingEvent } from '../types';

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



interface TotalHeartRateZonesColumnProps {
  events: TrainingEvent[];
}

const TotalHeartRateZonesColumn: React.FC<TotalHeartRateZonesColumnProps> = ({ events }) => {
  const totalZones: { [key: string]: number } = {};
  let totalTime = 0;

  events.forEach(event => {
    Object.entries(event.time_in_zones).forEach(([index, data]) => {
      if (!totalZones[data.zoneNumber]) {
        totalZones[data.zoneNumber] = 0;
      }
      totalZones[data.zoneNumber] += data.secsInZone;
      totalTime += data.secsInZone;
    });
  });

  return (
    <td className="border p-2 align-top">
      <div className="font-bold">Total</div>
      {Object.entries(totalZones).map(([zone, total]) => (
        <div key={zone} className="mt-1 p-1">
          <div className="text-xs font-semibold">
            Z{zone}: {Math.round(total / 60)} min ({((total / totalTime) * 100).toFixed(2)}%)
          </div>
        </div>
      ))}
    </td>
  );
};

export default TotalHeartRateZonesColumn;


export {TotalHeartRateZonesColumn, HeartRateZones };