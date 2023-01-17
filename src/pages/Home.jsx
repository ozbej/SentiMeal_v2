import {React, useState, useEffect} from 'react';
import { Col, Row } from 'antd';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "../components/Map";
import { useLoadScript } from "@react-google-maps/api";

export default function Home() {

    const render = (status) => {
        return <h1>{status}</h1>;
    };
/*
    const [restaurants, setRestaurants] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:5000/restaurants",{
          'methods':'GET',
          headers : {
            'Content-Type':'application/json'
          }
        })
        .then(response => response.json())
        .then(response => {
            let restaurantArr = [];

            response && response.map(restaurant => restaurantArr.push({
                businessId: restaurant.business_id,
                name: restaurant.name,
                longitude: restaurant.longitude,
                latitude: restaurant.latitude
            }))

            setRestaurants(restaurantArr)
            console.log(restaurantArr)
        })
        .catch(error => console.log(error))
      },[]) */

      const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAJA0KO_kEJ2RMOeWIMosfsAGS_8HpgCDg",
        libraries: ["places"]
      })
    if (!isLoaded) return <div>Loading...</div>
    return (
        <>
            <Row>
                <Col span={24}>
                    <h1 style={{textAlign:"center"}}>Home page</h1>
                    
                    <Map />
                    
                </Col>
                
            </Row>
            
        </>
    );
}
