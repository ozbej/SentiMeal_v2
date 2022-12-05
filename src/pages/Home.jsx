import {React, useState, useEffect} from 'react';
import { Col, Row } from 'antd';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "../components/Map"

function Home() {

    const render = (status) => {
        return <h1>{status}</h1>;
    };

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
      },[])
    
    return (
        <>
            <Row>
                <Col span={24}>
                    <h1 style={{textAlign:"center"}}>Home page</h1>
                    <Wrapper apiKey={"AIzaSyAJA0KO_kEJ2RMOeWIMosfsAGS_8HpgCDg"} render={render}>
                        <Map />
                    </Wrapper>
                </Col>
            </Row>
        </>
    );
}

export default Home;