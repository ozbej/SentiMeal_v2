import {React, useState, useEffect} from 'react';
import { Col, Row } from 'antd';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "../components/Map";
import { useLoadScript } from "@react-google-maps/api";

export default function Home() {

    const render = (status) => {
        return <h1>{status}</h1>;
    };
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
