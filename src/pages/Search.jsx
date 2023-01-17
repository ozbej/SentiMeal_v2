import { useEffect, React, useState } from 'react';
import { Col, Row, Input, Select, Spin } from 'antd';
import  { useNavigate  } from 'react-router-dom';

const { Search } = Input;

function SearchPage() {

    const navigate = useNavigate();

    const [restaurants, setRestaurants] = useState([]);

    const onSearch = (value) => {
        navigate('/dashboard', {state:{business_id:value}});
    };

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
            response && response.map((restaurant, index) => restaurantArr.push({
                value: restaurant.business_id,
                label: restaurant.name
            }))

            setRestaurants(restaurantArr)
        })
        .catch(error => console.log(error))
      },[])

    return (
        <>
            {restaurants ? (
            <>
                <Row style={{display: "flex", justifyContent:"center"}}>
                    <img src={process.env.PUBLIC_URL + '/restaurant-vector.jpg'} width="30%"/> 
                </Row>
                <Row>
                    <Col span={24}>
                        <h1 style={{textAlign:"center"}}>Find your restaurant:</h1>
                    </Col>
                </Row>
                <Row>
                    <Col span={9}></Col>
                    <Col span={6} style={{textAlign:"center"}}>
                    <Select
                        showSearch
                        size="large"
                        placeholder="Select a restaurant"
                        optionFilterProp="children"
                        onChange={onSearch}
                        filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={restaurants ? restaurants : []}
                        style={{width:"100%"}}
                    />
                    </Col>
                    <Col span={9}></Col>
                </Row>
                </>
            ) : 
            <Col span={24} style={{display: "flex", justifyContent: "center", alignItems: "center", height: "20em"}}><Spin /></Col>}
        </>
    );
}

export default SearchPage;