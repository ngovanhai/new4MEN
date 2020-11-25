import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid } from '@material-ui/core';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

import './Payment.scss';
import { useForm } from 'react-hook-form';
import FormAdress from 'features/Products/components/FormPayment/FormAdress';

Payment.propTypes = {

};


function Payment(props) {
    const { register, handleSubmit, setValue } = useForm();


    const onSubmit = (values) => {
        // console.log(values);
    }
    return (
        <div className="Payment">
            <Breadcrumb>
                <div className="GroupProduct__brumb">
                    <Container fixed className="GroupProduct__brumbsitem">
                        <Breadcrumb.Item ><Link to="/">4 MEN</Link></Breadcrumb.Item>
                        <Breadcrumb.Item ><Link to="/thanh-toan"> Thanh - Toán</Link></Breadcrumb.Item>
                    </Container>
                </div>
            </Breadcrumb>
            <Container fixed>
                <FormAdress />
            </Container>
        </div>

    );
}

export default Payment;