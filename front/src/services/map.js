const getMapPath = async (directionsService, originRef, destinationRef) => {
  return await directionsService.route({
    origin: originRef.current.value,
    destination: destinationRef.current.value,
    // eslint-disable-next-line no-undef
    travelMode: google.maps.TravelMode.BICYCLING,
  });
};
// eslint-disable-next-line
export default { getMapPath };
