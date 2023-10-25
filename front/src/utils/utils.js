const minsToRunning = (walkingMins) =>
  Math.round((walkingMins * 0.5581395) / 60.0);

// Round to 1 decimal place
const metersToKilometers = (meters) => Math.round((meters / 1000.0) * 10) / 10;

const durationString = (duration) => {
  if (minsToRunning(duration) >= 60) {
    return `${Math.floor(minsToRunning(duration) / 60)} hours ${
      minsToRunning(duration) % 60
    } mins`;
  } else {
    return `${minsToRunning(duration) % 60} mins`;
  }
};

const calculateDirectionsURL = (waypoints) => {
  const origin = waypoints[0].name;
  const waypointString = waypoints
    .slice(1, waypoints.length - 1)
    .map((wp) => wp.name)
    .join("|");

  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${origin}&waypoints=${waypointString}&travelmode=walking`;
};

export {
  minsToRunning,
  metersToKilometers,
  durationString,
  calculateDirectionsURL,
};
