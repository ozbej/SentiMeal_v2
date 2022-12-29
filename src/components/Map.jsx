import React from "react";
import {useState, useRef, useEffect, useMemo, useCallback} from "react";
import { GoogleMap, useJsApiLoader,  Marker, DirectionsRenderer, Circle, MarkerClusterer, } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '80vh'
};


function Map() {

  const [office, setOffice] = useState()
  const [directions, setDirections] = useState()
  const mapRef = useRef()
  const center = useMemo(() => ({ lat: 47.066668, lng: 15.441371 }), [])
  const options = useMemo(
    () => ({
      mapId: "b181cac70f27f5e6",
      disableDefaultUI: true,
      clickableIcons: false
    }),
    []
  )

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAJA0KO_kEJ2RMOeWIMosfsAGS_8HpgCDg"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)
