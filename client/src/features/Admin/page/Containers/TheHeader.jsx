import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';

import {
    CHeader,
    CToggler,
    CHeaderBrand,
    CHeaderNav,
    CHeaderNavItem,
    CHeaderNavLink,
    CSubheader,
    CBreadcrumbRouter,
    CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import userApi from 'api/useAPI';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToUser } from 'features/Login/authSlice';



TheHeader.propTypes = {

};

function TheHeader(props) {
    const history = useHistory()
    const dispatch = useDispatch()
    const logout = async () => {
        localStorage.removeItem('firstLogin')
        localStorage.removeItem('token')
        await userApi.logout();
        history.push('/')

    }
    const inforUser = useSelector(state => state.auth)
    useEffect(() => {
        const getUser = async () => {
            const res = await userApi.getUser()
            dispatch(addToUser(res))
        }
        if (Object.keys(inforUser.user) == 0) {
            getUser()
        }
    }, [])
    return (
        <div>
            <CHeader withSubheader>

                <CHeaderBrand className="mx-auto d-lg-none" to="/">
                    <CIcon name="logo" height="48" alt="Logo" />
                    <img src="" alt="" srcset="" />
                </CHeaderBrand>



                <CSubheader className="px-3 justify-content-between">
                    <CBreadcrumbRouter
                        className="border-0 c-subheader-nav m-0 px-0 px-md-3"
                    />
                    <div className="d-md-down-none mfe-2 c-subheader-nav">
                        <CLink className="c-subheader-nav-link" href="#">
                            <CIcon name="cil-speech" alt="Settings" />
                        </CLink>
                        <CLink
                            className="c-subheader-nav-link"
                            aria-current="page"
                            onClick={logout}
                        >
                            <CIcon name="cil-graph" alt="Dashboard" />&nbsp;logout
                        </CLink>
                        <CLink className="c-subheader-nav-link" href="#">
                            {
                                Object.keys(inforUser.user).length !== 0 && (
                                    <div>
                                        <CIcon name="cil-settings" alt="Settings" />
                                        {inforUser.user.name}
                                    </div>
                                )
                            }

                        </CLink>
                    </div>
                </CSubheader>
            </CHeader>
        </div>
    );
}

export default TheHeader;