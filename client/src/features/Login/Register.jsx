import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.scss';
import './Login.scss';
import { useForm } from 'react-hook-form';

import userApi from 'api/useAPI'

import { useDispatch } from 'react-redux';




function Register(props) {

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
    const onSubmit = async () => {
        try {
            const token = await userApi.register({ ...user })
            localStorage.setItem("token", JSON.stringify(token))
            localStorage.setItem('firstLogin', true)
            history.push('/admin')
        } catch (err) {
            alert(err.response.data.msg)
        }

    }
    return (
        <body>
            <div className="Login">
                <div className=" w3l-login-form">
                    <h2>Register Account </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className=" w3l-form-group">
                            <label style={{ color: "black" }}>User Name:</label>
                            <div className="group">
                                <i className="fas fa-user" />
                                <input name="email" type="text" onChange={onChangeInput} className="form-control" placeholder="User name" required="required" ref={register({
                                    validate: value => value !== "admin" || "Nice try!"
                                })} />
                            </div>
                        </div>
                        <div className=" w3l-form-group">
                            <label style={{ color: "black" }}>Email:</label>
                            <div className="group">
                                <i className="fas fa-user" />
                                <input name="email" type="email" onChange={onChangeInput} className="form-control" placeholder="Email" required="required" ref={register({
                                    validate: value => value !== "admin" || "Nice try!"
                                })} />
                            </div>
                        </div>
                        <div className=" w3l-form-group">
                            <label style={{ color: "black" }}>Password:</label>
                            <div className="group">
                                <i className="fas fa-unlock" />
                                <input name="password" type="password" onChange={onChangeInput} className="form-control" placeholder="Password" required="required"
                                    ref={register({
                                        validate: value => value !== "admin" || "Nice try!"
                                    })}
                                />
                            </div>
                        </div>
                        <button className="btnSubmit" type="submit">Register</button>
                    </form>
                    <p className=" w3l-register-p">You have an account ?<a href="#" className="register"> Login</a></p>
                </div>
            </div>
        </body>
    );
}

export default Register;