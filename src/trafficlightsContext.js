// src/TrafficLightContext.js
import React, { createContext, useReducer, useContext, useEffect } from 'react';

const TrafficLightContext = createContext();

const initialState = {
  currentLight: 'Green',
  isPedestrianRequest: false,
};

const trafficLightReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_LIGHT':
      return { ...state, currentLight: action.payload };
    case 'REQUEST_PEDESTRIAN_CROSSING':
      return { ...state, isPedestrianRequest: true };
    case 'RESET_PEDESTRIAN_REQUEST':
      return { ...state, isPedestrianRequest: false };
    default:
      return state;
  }
};

export const TrafficLightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trafficLightReducer, initialState);

  useEffect(() => {
    let interval;
    const lightDurations = {
      Green: 10000,
      Yellow: 3000,
      Red: 7000,
    };

    const changeLight = () => {
      const nextLight = {
        Green: 'Red',
        Yellow: 'Green',
        Red: 'Yellow',
      }[state.currentLight];

      dispatch({ type: 'CHANGE_LIGHT', payload: nextLight });
    };

    if (!state.isPedestrianRequest) {
      interval = setInterval(changeLight, lightDurations[state.currentLight]);
    } else {
      
      const pedestrianCrossingDuration = 5000;
      interval = setTimeout(() => {
        dispatch({ type: 'CHANGE_LIGHT', payload: 'Green' });
        dispatch({ type: 'RESET_PEDESTRIAN_REQUEST' });
      }, pedestrianCrossingDuration);
    }

    return () => clearInterval(interval);
  }, [state.currentLight, state.isPedestrianRequest]);

  return (
    <TrafficLightContext.Provider value={{ state, dispatch }}>
      {children}
    </TrafficLightContext.Provider>
  );
};

export const useTrafficLight = () => {
  return useContext(TrafficLightContext);
};
