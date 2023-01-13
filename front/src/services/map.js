const getMapPath = async (directionsService, path) => {
  return await directionsService.route({
    origin: path[0].name,
    destination: path[path.length - 1].name,
    waypoints: path
      .slice(1, path.length - 1)
      .map((wp) => ({ location: wp.name, stopover: false })),
    // eslint-disable-next-line no-undef
    travelMode: google.maps.TravelMode.WALKING,
  });
};
// eslint-disable-next-line
export default { getMapPath };
