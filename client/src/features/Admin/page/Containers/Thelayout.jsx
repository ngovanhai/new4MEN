import React, { useEffect } from 'react';

import {
    TheContent,
    TheSidebar,
    TheHeader
} from './index'
import { useHistory } from 'react-router-dom';
import userApi from 'api/useAPI';



const Thelayout = (props) => {
    const history = useHistory()
    useEffect(() => {
        const isLogin = localStorage.getItem('firstLogin')
        if (isLogin === false || isLogin === null) {
            history.push('/')
        } else {
            const role = async () => {
                const user = await userApi.getUser()
                if (user.role !== 1)
                    history.push('/')
            }
            role();
        }
    }, [])
    return (
        <div className="c-app c-default-layout">
            <TheSidebar />
            <div className="c-wrapper">
                <TheHeader />
                <div className="c-body">
                    <TheContent />
                </div>
            </div>
        </div>

    );
}

export default Thelayout