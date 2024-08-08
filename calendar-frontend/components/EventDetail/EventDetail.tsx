// EventDetail.tsx
import React from 'react';
import {HeartRateZones} from './HeartRateZones';
import { TrainingEvent } from '../types';

interface EventDetailProps {
  selectedEvent: TrainingEvent;
  onClose: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ selectedEvent, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedEvent.title}</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">Source: {selectedEvent.source}</p>
            <p className="text-sm text-gray-500">Start Time: {new Date(selectedEvent.start_time).toLocaleString()}</p>
            {selectedEvent.duration && <p className="text-sm text-gray-500">Duration: {selectedEvent.duration}</p>}
            {selectedEvent.distance && <p className="text-sm text-gray-500">Distance: {selectedEvent.distance} km</p>}
            {selectedEvent.calories && <p className="text-sm text-gray-500">Calories: {selectedEvent.calories}</p>}
            {selectedEvent.elevation_gain && <p className="text-sm text-gray-500">Elevation Gain: {selectedEvent.elevation_gain} m</p>}
            <HeartRateZones timeInZones={selectedEvent.time_in_zones} />
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
