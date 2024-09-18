// src/App.js
import React from 'react';
import { TrafficLightProvider } from './trafficlightsContext';
import TrafficLight from './trafficlight';

const App = () => {
  return (
    <TrafficLightProvider>
      <div className='bg'>
        <h1 className='heading'>Traffic Lights</h1>
        <TrafficLight />
      </div>
    </TrafficLightProvider>
  );
};

export default App;
