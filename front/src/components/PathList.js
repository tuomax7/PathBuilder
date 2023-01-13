import { createRef, useState } from "react";
import Togglable from "./Togglable.js";
import Map from "./Map.js";

import axios from "axios";

import { minsToRunning, metersToKilometers } from "../utils.js";

const PathList = ({ paths, setPaths, waypoints }) => {
  const mapRef = createRef();

  const [sortBy, setSortBy] = useState("likes");

  const sortedPaths = () => {
    if (sortBy === "distance")
      return paths.sort((a, b) => b.distance - a.distance);
    else if (sortBy === "duration")
      return paths.sort((a, b) => b.duration - a.duration);
    else return paths.sort((a, b) => b.likes - a.likes);
  };

  //KORVAA SQL-KYSELYLLÄ
  const waypointsOfPathID = (ID) =>
    waypoints.filter((waypoint) => waypoint.pathID === ID);

  const handleLike = async (pathToUpdate) => {
    const response = await axios.put(
      `http://localhost:3001/api/paths/${pathToUpdate.ID}/like`,
      pathToUpdate
    );
    const updatedPath = await response.data;

    const updatedPaths = paths.map((path) =>
      path.ID === pathToUpdate.ID ? updatedPath : path
    );

    setPaths(updatedPaths);
  };

  return (
    <div>
      <div>
        Sort by:
        <input
          defaultChecked
          type="radio"
          id="likes"
          name="sorter"
          onChange={() => setSortBy("likes")}
        />
        <label htmlFor="likes">Likes</label>
        <input
          type="radio"
          name="sorter"
          id="distance"
          onChange={() => setSortBy("distance")}
        />
        <label htmlFor="distance">Distance</label>
        <input
          type="radio"
          name="sorter"
          id="duration"
          onChange={() => setSortBy("duration")}
        />
        <label htmlFor="duration">Duration</label>
      </div>
      <h3>All paths</h3>
      {sortedPaths().map((path) => (
        <div key={path.ID}>
          <h4>
            '{path.name}' with {path.likes} likes
          </h4>
          {path.distance && path.duration ? (
            <p>
              {metersToKilometers(path.distance)} km,{" "}
              {minsToRunning(path.duration)} mins
            </p>
          ) : (
            <p>Show to build path!</p>
          )}
          <Togglable buttonLabel="Show path!" ref={mapRef}>
            Waypoints:
            <ol>
              {waypointsOfPathID(path.ID).map((waypoint) => (
                <li key={waypoint.ID}>{waypoint.name}</li>
              ))}
            </ol>
            <Map
              waypoints={waypointsOfPathID(path.ID)}
              path={{ ID: path.ID, name: path.name, likes: path.likes }}
            />
            <button onClick={() => handleLike(path)}>Like path!</button>
          </Togglable>
        </div>
      ))}
    </div>
  );
};

export default PathList;
