import possibleWaypoints from "../waypoints.json";

const numberOfWaypoints = 3;

const generatePath = (startName) => {
  const start = { name: startName };

  let availableWaypoints = possibleWaypoints.filter(
    (wp) => wp.name !== start.name
  );

  const randomWaypoint = () => {
    const randIndex = Math.floor(
      Math.random() * (availableWaypoints.length - 1)
    );
    const randomizedWaypoint = availableWaypoints[randIndex];
    availableWaypoints = availableWaypoints.filter(
      (wp) => wp.name !== randomizedWaypoint.name
    );
    return randomizedWaypoint;
  };

  const randomWaypoints = [
    ...new Set(Array.from({ length: numberOfWaypoints }, randomWaypoint)),
  ];

  const randomPath = [start, ...randomWaypoints, start];

  return randomPath;
};

export default generatePath;
