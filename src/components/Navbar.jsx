import React from "react";
import { Link } from "react-router-dom";
import { Menu } from 'antd';
import { HomeOutlined, SearchOutlined } from '@ant-design/icons';


function Navbar() {
  return (
    <Menu mode="horizontal" defaultSelectedKeys={["home"]}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="search" icon={<SearchOutlined />}>
            <Link to="/search">Search</Link>
        </Menu.Item>
    </Menu>
  );
}

export default Navbar;