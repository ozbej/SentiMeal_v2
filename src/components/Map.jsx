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
/*
  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])
*/
const onLoad = useCallback(map => (mapRef.current = map), [])
const restaurants = useMemo(() => generateRestaurants(center), [center])

const onUnmount = React.useCallback(function callback(map) {setMap(null)}, [])


  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        options={options}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ 
         (
          <>
            
            <MarkerClusterer>
              {clusterer =>
                restaurants.map(restaurant => (
                  <><Marker
                    key={restaurant.lat}
                    position={restaurant}
                    clusterer={clusterer} />
                    <Circle center={restaurant} radius={500} options={goodOptions} />
                    </>
            
                ))
              }
            </MarkerClusterer>

            
            
            
          </>
        )
        }
        <></>
      </GoogleMap>
  ) : <></>
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true
}

const goodOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A"
}
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D"
}
const badOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252"
}

const generateRestaurants = position => {
  const _restaurants = []
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2
    _restaurants.push({
      lat: position.lat + Math.random() * 0.1 / direction,
      lng: position.lng + Math.random() * 0.1 / direction
    })
  }
  return _restaurants
}

export default React.memo(Map)
