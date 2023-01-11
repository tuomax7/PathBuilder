const PathList = ({ paths, waypoints }) => {
  //KORVAA SQL-KYSELYLLÄ
  const waypointsOfPathID = (ID) =>
    waypoints.filter((waypoint) => waypoint.pathID === ID);

  return (
    <div>
      <h3>All paths</h3>
      {paths.map((path) => (
        <div key={path.ID}>
          <button>
            {path.name} of rating {path.rating}
          </button>
          <ol>
            {waypointsOfPathID(path.ID).map((waypoint) => (
              <li key={waypoint.ID}>{waypoint.name}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

export default PathList;
