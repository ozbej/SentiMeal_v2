import React from 'react';
import { Col, Row, Divider, Input } from 'antd';

const { Search } = Input;

const onSearch = (value) => console.log(value);

function SearchPage() {
    return (
        <>
            <Row>
                <Col span={24}>
                    <h1 style={{textAlign:"center"}}>Find your restaurant:</h1>
                </Col>
            </Row>
            <Row>
                <Col span={9}></Col>
                <Col span={6} style={{textAlign:"center"}}>
                    <Search
                    placeholder="Input business ID"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                    />
                </Col>
                <Col span={9}></Col>
            </Row>
        </>
    );
}

export default SearchPage;