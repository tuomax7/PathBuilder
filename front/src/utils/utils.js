const minsToRunning = (walkingMins) =>
  Math.round((walkingMins * 0.5581395) / 60.0);

const metersToKilometers = (meters) => Math.round(meters / 1000.0);

export { minsToRunning, metersToKilometers };
