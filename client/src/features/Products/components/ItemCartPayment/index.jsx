import React from 'react';
import { Button, Col, Row } from 'antd';
import './ItemCArtPayment.scss';

ItemCartPayment.propTypes = {

};

function ItemCartPayment(props) {
    const { product, onCLickDelete } = props;

    function handleDelete() {
        (onCLickDelete) ? onCLickDelete(product) : console.log("k co");;
    }
    function fomatMoney(money) {
        return money.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    function formatCash(str) {
        return str.toString().split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }
    return (
        <div className="ItemCartPayment">
            <Row >
                <Col span={4}><img src={product.image[0].url} alt="" className="ItemCartPayment__image" /></Col>
                <Col span={6}>{product.tittle}</Col>
                <Col span={4} >{product.slmua} <p> size : {product.size}</p></Col>
                <Col span={4}>{formatCash(product.gia)} VNĐ</Col>
                <Col span={4}>{formatCash(product.gia * +product.slmua)} VNĐ</Col>
                <Col span={2}>
                    <Button type="danger" onClick={handleDelete}>Xóa</Button>
                </Col>
            </Row>
            <div className="ItemCartPayment__line"></div>
        </div>


    );
}

export default ItemCartPayment;