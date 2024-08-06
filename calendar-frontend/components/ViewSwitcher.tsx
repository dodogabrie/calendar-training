"use client";

import React, { useState } from 'react';
import AddTrainingEvent from './AddTrainingEvents';
import TrainingEvents from './TrainingEvents';

const ViewSwitcher: React.FC = () => {
  const [view, setView] = useState<'form' | 'calendar'>('calendar');

  return (
    <div>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setView('calendar')}
          className={`${
            view === 'calendar' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          } px-4 py-2 rounded`}
        >
          View Calendar
        </button>
        <button
          onClick={() => setView('form')}
          className={`${
            view === 'form' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          } px-4 py-2 rounded`}
        >
          Add Training Event
        </button>
      </div>

      {view === 'calendar' && <TrainingEvents />}
      {view === 'form' && <AddTrainingEvent />}
    </div>
  );
};

export default ViewSwitcher;
