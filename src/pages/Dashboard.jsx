import { useState, useEffect, React } from 'react';
import {useLocation} from 'react-router-dom';
import { Col, Row, Rate } from 'antd';

function Dashboard() {

    const [restaurant, setRestaurant] = useState([]);

    const location = useLocation();

    useEffect(()=>{
        fetch(`http://localhost:5000/reviews?business_id=${location.state.business_id}`,{
          'methods':'GET',
          headers : {
            'Content-Type':'application/json'
          }
        })
        .then(response => response.json())
        .then(response => setRestaurant(response))
        .catch(error => console.log(error))
    
      },[])

    return (
      <>
        <Row>
          <Col span={8} />
          <Col span={8} style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"center"}}>
            <h1 style={{textAlign:"center"}}>{restaurant.name}</h1>
          </Col>
        </Row>
        <Row>
          <Col span={8} style={{border:"1px black solid", alignContent: "center"}}>
            <Row>
              <Col span={12} style={{textAlign:"center"}}>
                <h2>Restaurant rating</h2>
                <Rate disabled value={restaurant.stars} />
              </Col>
              <Col span={12} style={{textAlign:"center"}}>
                <h2>Total reviews</h2>
                <h2>{restaurant.reviews != undefined ? restaurant.reviews.length : 0}</h2>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
}

export default Dashboard;