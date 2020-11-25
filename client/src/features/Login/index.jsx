import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.scss';
import './Login.scss';
import { useForm } from 'react-hook-form';
import { rf_token } from './authSlice'

import userApi from 'api/useAPI'

import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';


Login.propTypes = {};

function Login(props) {

    const { handleSubmit, register, errors } = useForm();
    const history = useHistory();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        "email": '',
        "password": ''
    })

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }
    const test = async () => {
        const a = await userApi.test();
        console.log(a);
    }
    const onSubmit = async () => {
        try {
            const token = await userApi.login({ ...user })
            localStorage.setItem("token", JSON.stringify(token))
            localStorage.setItem('firstLogin', true)
            history.push('/admin')

        } catch (err) {
            alert(err.msg)
        }

    }
    return (
        <body>
            <div className="Login">
                <div className=" w3l-login-form">
                    <h2>Login Here</h2>
                    <Button onClick={test}> test</Button>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className=" w3l-form-group">
                            <label>Username:</label>
                            <div className="group">
                                <i className="fas fa-user" />
                                <input name="email" type="email" onChange={onChangeInput} className="form-control" placeholder="Username" required="required" ref={register({
                                    validate: value => value !== "admin" || "Nice try!"
                                })} />
                            </div>
                        </div>
                        <div className=" w3l-form-group">
                            <label>Password:</label>
                            <div className="group">
                                <i className="fas fa-unlock" />
                                <input name="password" type="password" onChange={onChangeInput} className="form-control" placeholder="Password" required="required"
                                    ref={register({
                                        validate: value => value !== "admin" || "Nice try!"
                                    })}
                                />
                            </div>
                        </div>
                        <div className="forgot">
                            <a href="#">Forgot Password?</a>
                            <p><input type="checkbox" />Remember Me</p>
                        </div>
                        <button className="btnSubmit" type="submit">Login</button>
                    </form>
                    <p className=" w3l-register-p">Don't have an account?<a href="#" className="register"> Register</a></p>
                </div>
            </div>
        </body>
    );
}

export default Login;