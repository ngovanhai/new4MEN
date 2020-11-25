import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

Dashboard.propTypes = {

};

function Dashboard(props) {
    const [Collapsed, setCollapsed] = useState(false);
    const handleCollapsed = () => setCollapsed(!Collapsed)

    return (
        <div className="admin">
            day la Dashboard
            
        </div>
    );
}

export default Dashboard;