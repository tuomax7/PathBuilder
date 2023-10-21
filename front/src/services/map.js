export const getMapPath = async (directionsService, path) => {
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

export const calculateStartPos = async (startName, setStartPos) => {
  // eslint-disable-next-line no-undef
  const geocoder = new google.maps.Geocoder();

  const startPosRequest = await geocoder.geocode({
    address: startName,
  });

  const startPosLat = await startPosRequest.results[0].geometry.location.lat();
  const startPosLng = await startPosRequest.results[0].geometry.location.lng();
  await setStartPos({ lat: startPosLat, lng: startPosLng });
};

export const calculateRoute = async (path, setDirectionsResponse) => {
  // eslint-disable-next-line no-undef
  const directionsService = new google.maps.DirectionsService();

  const results = await getMapPath(directionsService, path.waypoints);
  await setDirectionsResponse(results);
};

// eslint-disable-next-line
