import React, { useState } from 'react';
import { Layout, Menu, Drawer, Button } from 'antd';
import {
    MenuOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import './Header.scss';

const { Header } = Layout;

const Nav = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);

    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    };
    

    return (
        <Header className="header">
            <span className="header-title">Melawati</span>
            <div className="menu-container">
                <Menu mode="horizontal" defaultSelectedKeys={['1']} className="desktop-menu">
                    <Menu.Item key="1">Home</Menu.Item>
                    <Menu.Item key="2">About</Menu.Item>
                    <Menu.Item key="3">Skill</Menu.Item>
                    <Menu.Item key="4">Portfolio</Menu.Item>
                    <Menu.Item key="5">Qualification</Menu.Item>
                    <Menu.Item key="6">Contact</Menu.Item>
                </Menu>

                <Button onClick={toggleDrawer} className="mobile-menu-icon">
                    {drawerVisible ? <CloseOutlined /> : <MenuOutlined />}
                </Button>

                <Drawer
                    title="Menu"
                    placement="right"
                    closable={false}
                    onClose={toggleDrawer}
                    visible={drawerVisible}
                    className="mobile-menu"
                >
                    <Menu mode="vertical" defaultSelectedKeys={['1']} onClick={toggleDrawer}>
                        <Menu.Item key="1">Home</Menu.Item>
                        <Menu.Item key="2">About</Menu.Item>
                        <Menu.Item key="3">Skill</Menu.Item>
                        <Menu.Item key="4">Portfolio</Menu.Item>
                        <Menu.Item key="5">Qualification</Menu.Item>
                        <Menu.Item key="6">Contact</Menu.Item>
                    </Menu>
                </Drawer>
            </div>
        </Header>
    );
};

export default Nav;
