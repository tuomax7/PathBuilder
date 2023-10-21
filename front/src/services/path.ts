import axios from "axios";
import {
  NewPathEntry,
  WayPoint,
  PathBase,
  Path,
  NewWayPointEntry,
} from "../../../types/types";

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
  randomPathData: PathBase,
  distanceResponse: number,
  durationResponse: number,
  randomPath: WayPoint[]
) => {
  const newPath: NewPathEntry = {
    ...randomPathData,
    waypoints: randomPath,
    distance: distanceResponse,
    duration: durationResponse,
  };

  const response = await axios.post(`${urlBase}/api/paths/insert`, newPath);

  return response.data[0];
};

const createWaypoint = async (waypoint: NewWayPointEntry, pathInsert: Path) => {
  const newWayPoint: WayPoint = {
    ...waypoint,
    pathID: pathInsert.pathID,
  };

  console.log(pathInsert);

  const response = await axios.post(
    `${urlBase}/api/waypoints/insert`,
    newWayPoint
  );
  return response;
};

const createWayPoints = async (
  randomPath: NewWayPointEntry[],
  pathInsert: Path
) => {
  await Promise.all(
    randomPath.map(async (waypoint) => {
      const waypointInsert = await createWaypoint(waypoint, pathInsert);
      return {
        ...waypoint,
        pathID: pathInsert.pathID,
        ID: waypointInsert.data[0].ID,
      };
    })
  );
};

const updatePathLikes = async (pathToUpdate: Path) => {
  const response = await axios.put(
    `${urlBase}/api/paths/${pathToUpdate.pathID}/like`,
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
