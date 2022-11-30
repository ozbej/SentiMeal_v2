import React from 'react';
import { Col, Row, Divider, Input } from 'antd';

const { Search } = Input;

const onSearch = (value) => console.log(value);

function Home() {
    return (
        <>
            <Row>
                <Col span={24}>
                    <h1 style={{textAlign:"center"}}>Home page</h1>
                </Col>
            </Row>
        </>
    );
}

export default Home;