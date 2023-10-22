import { NewWayPointEntry, Path } from "../../../types/types";

export const getMapPath = async (
  directionsService: google.maps.DirectionsService,
  path: NewWayPointEntry[]
) => {
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

export const calculateStartPos = async (startName: string) => {
  // eslint-disable-next-line no-undef
  const geocoder = new google.maps.Geocoder();

  const startPosRequest = await geocoder.geocode({
    address: startName,
  });

  const startPosLat = await startPosRequest.results[0].geometry.location.lat();
  const startPosLng = await startPosRequest.results[0].geometry.location.lng();
  return { lat: startPosLat, lng: startPosLng };
};

export const calculateRoute = async (path: Path) => {
  // eslint-disable-next-line no-undef
  const directionsService = new google.maps.DirectionsService();

  const results = await getMapPath(directionsService, path.waypoints);
  return results;
};

// eslint-disable-next-line
