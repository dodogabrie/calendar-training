import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrainingEvents = () => {
  const [trainingEvents, setTrainingEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/training_events/')
      .then(response => {
        setTrainingEvents(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the training events!', error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Training Events</h1>
      <div className="grid grid-cols-1 gap-4">
        {trainingEvents.map(event => (
          <div key={event.id} className="p-4 border rounded-lg shadow">
            <h2 className="font-bold">{event.title}</h2>
            <p>Type: {event.event_type === 'DUR' ? 'Duration' : 'Distance'}</p>
            <p>Start Time: {new Date(event.start_time).toLocaleString()}</p>
            {event.duration && <p>Duration: {event.duration}</p>}
            {event.distance && <p>Distance: {event.distance} km</p>}
            <h3 className="font-bold mt-2">Steps:</h3>
            {event.steps.map(step => (
              <div key={step.id} className="ml-4">
                <p>Step {step.step_number}: {step.description}</p>
                {step.duration && <p>Duration: {step.duration}</p>}
                {step.distance && <p>Distance: {step.distance} km</p>}
                {step.rest_duration && <p>Rest Duration: {step.rest_duration}</p>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingEvents;
