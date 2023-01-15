import axios from "axios";

const getPaths = async () => {
  const response = await axios.get("http://localhost:3001/api/paths/get");
  return response.data;
};

const getWaypoints = async () => {
  const response = await axios.get("http://localhost:3001/api/waypoints/get");
  return response.data;
};

const createPath = async (
  randomPathData,
  distanceResponse,
  durationResponse,
  randomPath
) => {
  const response = await axios.post("http://localhost:3001/api/paths/insert", {
    ...randomPathData,
    waypoints: randomPath,
    distance: distanceResponse,
    duration: durationResponse,
  });

  return response;
};

const createWaypoint = async (waypoint, pathInsert) => {
  const response = await axios.post(
    "http://localhost:3001/api/waypoints/insert",
    {
      ...waypoint,
      pathID: pathInsert.data[0].pathID,
    }
  );
  return response;
};

// eslint-disable-next-line
export default { getPaths, getWaypoints, createPath, createWaypoint };
