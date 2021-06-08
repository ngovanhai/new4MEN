import React from 'react';

import { Controller, useForm } from 'react-hook-form';

import { Input, Form, Row, Col, Button } from 'antd';
import './FormAdress.scss';
import ItemCartPayment from '../../ItemCartPayment';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteProductToCart, deleteAllCart } from 'features/Cart/cartSlice';
import oderApi from 'api/oderApi';
import { object } from 'yup';

const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16
    }
};

function FormAdress(props) {


    const { control, register, handleSubmit, setValue } = useForm();

    const products = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const oder = { ...products }
    const onFinish = (values) => {
        if (Object.keys(oder).length == 0) {
            alert("Không có sản phẩm trong rỏ hàng của bạn");
            return;
        }
        const oders = {
            oder, ...values, "idOder": Math.trunc(Math.random() * 1000), "check": false, "total": num()
        }
        const createOder = async () => {
            const a = await oderApi.createOder(oders);
        }
        createOder();
        const actionDeleteCart = deleteAllCart();
        dispatch(actionDeleteCart);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const onSubmit = (values) => {
        const oders = {
            oder, ...values, "idOder": Math.trunc(Math.random() * 1000), "check": false, "total": num()
        }
        const createOder = async () => {
            await oderApi.createOder(oders)
        }
        createOder();
        const actionDeleteCart = deleteAllCart(0);
        dispatch(actionDeleteCart);
    }
    const handleChangeInformation = (e) => {
        const { name, value } = e.target.value;
    }

    const num = () => {
        let gia;
        if (products.length) {
            gia = products.map(x => +(x.gia * parseInt(x.slmua))).reduce((a, b) => a + b).toLocaleString()
        }
        else {
            gia = 0;
        }
        return gia;
    }
    const handleDelete = (product) => {
        const deleteItemCartId = product.idCart;
        const action = DeleteProductToCart(deleteItemCartId);
        dispatch(action);
    }

    return (
        <Row className="FormPayment" gutter={20}>
            <Col span={12} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} >
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <div className="FormPayment__FormAdress__title">Thông tin giao hàng liên hệ</div>
                    <div className="FormPayment__FormAdress__line"></div>
                    <Form.Item
                        label="Họ và tên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập đầy đủ họ và tên !"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập đầy đủ Email !"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập đầy đủ số điện thoại!"
                            }
                        ]}
                    >
                        <Input type="number" maxLength="13" />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ giao hàng"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập đầy đủ địa chỉ giao hàng !"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Gửi đơn hàng
                    </Button>
                    </Form.Item>
                </Form>

            </Col>
            <Col span={12} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
                <div className="__FormPayment__FormCart">
                    <div className="FormPayment__FormAdress__title">Thông tin đơn hàng</div>
                    <div className="FormPayment__FormAdress__line"></div>
                    <Row>
                        <Col span={4}><strong> Hình ảnh</strong></Col>
                        <Col span={6}><strong>Tên sản phẩm</strong></Col>
                        <Col span={4}><strong> Số lượng </strong></Col>
                        <Col span={4}><strong> Giá</strong></Col>
                        <Col span={4}><strong> Tổng </strong></Col>
                        <Col span={2}><strong>Xóa</strong></Col>
                    </Row>
                    {products.map((product) => (
                        <ItemCartPayment
                            product={product}
                            onCLickDelete={handleDelete}
                        />
                    ))}
                    < div className="FormPayment__FormAdress__title" style={{ marginTop: "15px" }}>Tổng :<span> {num()} VNĐ</span></div>
                </div>

            </Col>
        </Row >

    );
}

export default FormAdress;