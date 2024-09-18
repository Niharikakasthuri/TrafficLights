// src/TrafficLight.js
import React from 'react';
import { useTrafficLight } from './trafficlightsContext';


const TrafficLight = () => {
  const { state, dispatch } = useTrafficLight();

  const handlePedestrianRequest = () => {
    if (state.currentLight !== 'Red' && !state.isPedestrianRequest) {
      dispatch({ type: 'REQUEST_PEDESTRIAN_CROSSING' });
    }
  };

  return (
    <div className="traffic-light">
      <div className={`light red ${state.currentLight === 'Red' ? 'active' : ''}`}></div>
      <div className={`light yellow ${state.currentLight === 'Yellow' ? 'active' : ''}`}></div>
      <div className={`light green ${state.currentLight === 'Green' ? 'active' : ''}`}></div>
      <button onClick={handlePedestrianRequest} className="pedestrian-button">
        Request Crossing
      </button>
      {state.isPedestrianRequest && <div className="pedestrian-signal"> Crossing!</div>}
    </div>
  );
};

export default TrafficLight;
