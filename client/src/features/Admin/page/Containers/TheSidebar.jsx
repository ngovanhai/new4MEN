import React from 'react';
import PropTypes from 'prop-types';
import Sider from 'antd/lib/layout/Sider';
import { Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import CIcon from '@coreui/icons-react'

import {
    CCreateElement,
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarNavDivider,
    CSidebarNavTitle,
    CSidebarMinimizer,
    CSidebarNavDropdown,
    CSidebarNavItem,
} from '@coreui/react'

import navigation from './_nav'

TheSidebar.propTypes = {

};

function TheSidebar(props) {
    const dispatch = useDispatch()
    const show = useSelector(state => state.sidebarShow)

    return (
        <CSidebar
        // show={show}
        // onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
        >
            <CSidebarBrand className="d-md-down-none" to="/">
                <CIcon
                    className="c-sidebar-brand-full"
                    name="logo-negative"
                    height={35}
                />
                <CIcon
                    className="c-sidebar-brand-minimized"
                    name="sygnet"
                    height={35}
                />
            </CSidebarBrand>
            <CSidebarNav>

                <CCreateElement
                    items={navigation}
                    components={{
                        CSidebarNavDivider,
                        CSidebarNavDropdown,
                        CSidebarNavItem,
                        CSidebarNavTitle
                    }}
                />
            </CSidebarNav>
            <CSidebarMinimizer className="c-d-md-down-none" />
        </CSidebar>
    );
}

export default TheSidebar;