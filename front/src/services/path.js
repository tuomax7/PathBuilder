import axios from "axios";

const getPaths = async () => {
  const response = await axios.get("http://localhost:3001/api/paths/get");
  return response.data;
};

const getWaypoints = async () => {
  const response = await axios.get("http://localhost:3001/api/waypoints/get");
  return response.data;
};

// eslint-disable-next-line
export default { getPaths, getWaypoints };
