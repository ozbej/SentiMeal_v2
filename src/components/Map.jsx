import React from "react";
import {useState, useRef, useEffect, useMemo, useCallback} from "react";
import { GoogleMap, useJsApiLoader,  Marker, MarkerClusterer, Circle, InfoWindow } from '@react-google-maps/api';
import  { useNavigate  } from 'react-router-dom';

const containerStyle = {
  width: '100%',
  height: '80vh'
};


function Map() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const mapRef = useRef()
  const center = useMemo(() => ({ lat: 47.066668, lng: 15.441371 }), [])
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false
    }),
    []
  )

  const onVisitDashboard = (value) => {
    navigate('/dashboard', {state:{business_id:value}});
  };

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAJA0KO_kEJ2RMOeWIMosfsAGS_8HpgCDg"
  })

  const [map, setMap] = React.useState(null)
  const onLoad = useCallback(map => (mapRef.current = map), [])

  const onUnmount = React.useCallback(function callback(map) {setMap(null)}, [])

  useEffect(()=>{
    fetch("http://127.0.0.1:5000/restaurants",{
      'methods':'GET',
      headers : {
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(response => {
        let restaurantArr = [];
        response && response.map((restaurant, index) => {
          let position = restaurant.latitude.split(",");
          restaurantArr.push({
            business_id: restaurant.business_id,
            name: restaurant.name,
            lat: parseFloat(position[0]),
            lng: parseFloat(position[1]),
            stars: restaurant.stars
          })
        })

        setRestaurants(restaurantArr);
    })
    .catch(error => console.log(error))
  },[])


  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        options={options}
        onUnmount={onUnmount}
        onClick={() => setActiveMarker(null)}
      >
        { /* Child components, such as markers, info windows, etc. */ 
         (
          <>            
            <MarkerClusterer>
              {clusterer =>
                restaurants.map(restaurant => (
                  <>
                    <Marker
                      key={restaurant.business_id}
                      position={{lat: restaurant.lat, lng: restaurant.lng}}
                      clusterer={clusterer}
                      onClick={() => handleActiveMarker(restaurant.business_id)}
                      
                    >
                    { 
                    activeMarker === restaurant.business_id ? (
                      <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                        <div style={{display: "flex", flexDirection: "column"}}>
                          { restaurant.name }
                          <span>Stars: { restaurant.stars }</span>
                          <a href="#" 
                          onClick={() => {onVisitDashboard(restaurant.business_id); return false;}}>
                            Visit Restaurant Dashboard</a>
                        </div>
                      </InfoWindow>
                    ) : null}
                    </Marker>
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

export default React.memo(Map)
