const minsToRunning = (walkingMins) =>
  Math.round((walkingMins * 0.5581395) / 60.0);

const metersToKilometers = (meters) => Math.round(meters / 1000.0);

const calculateDirectionsURL = (waypoints) => {
  const origin = waypoints[0].name;
  const waypointString = waypoints
    .slice(1, waypoints.length - 1)
    .map((wp) => wp.name)
    .join("|");

  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${origin}&waypoints=${waypointString}&travelmode=walking`;
};

export { minsToRunning, metersToKilometers, calculateDirectionsURL };
