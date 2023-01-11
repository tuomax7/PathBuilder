const WayPointList = ({ waypoints }) => {
  return (
    <div>
      <h3>Waypoints</h3>
      <ul>
        {[...new Set(waypoints.map((wp) => wp.name))].map((waypoint) => (
          <li key={waypoint}>{waypoint}</li>
        ))}
      </ul>
    </div>
  );
};

export default WayPointList;
