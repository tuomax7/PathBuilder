import axios from "axios";

let urlBase = "";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  urlBase = "http://localhost:3001";
}

const getPaths = async () => {
  const response = await axios.get(`${urlBase}/api/paths/get`);
  return response.data;
};

const getWaypoints = async () => {
  const response = await axios.get(`${urlBase}/api/waypoints/get`);
  return response.data;
};

const createPath = async (
  randomPathData,
  distanceResponse,
  durationResponse,
  randomPath
) => {
  const response = await axios.post(`${urlBase}/api/paths/insert`, {
    ...randomPathData,
    waypoints: randomPath,
    distance: distanceResponse,
    duration: durationResponse,
  });

  return response;
};

const createWaypoint = async (waypoint, pathInsert) => {
  const response = await axios.post(`${urlBase}/api/waypoints/insert`, {
    ...waypoint,
    pathID: pathInsert.data[0].pathID,
  });
  return response;
};

const createWayPoints = async (randomPath, pathInsert) => {
  await Promise.all(
    randomPath.map(async (waypoint) => {
      const waypointInsert = await createWaypoint(waypoint, pathInsert);
      return {
        ...waypoint,
        pathID: pathInsert.data[0].pathID,
        ID: waypointInsert.data[0].ID,
      };
    })
  );
};

const updatePathLikes = async (pathToUpdate) => {
  const response = await axios.put(
    `${urlBase}/api/paths/${pathToUpdate.ID}/like`,
    pathToUpdate
  );
  const updatedPath = await response.data;

  return updatedPath;
};

// eslint-disable-next-line
export default {
  getPaths,
  getWaypoints,
  createPath,
  createWayPoints,
  updatePathLikes,
};
