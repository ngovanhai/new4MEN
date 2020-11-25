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
    return (
        <div className="ItemCartPayment">
            <Row >
                <Col span={4}><img src={product.image[0].public_id} alt="" className="ItemCartPayment__image" /></Col>
                <Col span={6}>{product.tittle}</Col>
                <Col span={4}>{product.slmua} size : {product.size}</Col>
                <Col span={4}>{product.gia}</Col>
                <Col span={4}>{product.gia * +product.slmua}</Col>
                <Col span={2}>
                    <Button type="danger" onClick={handleDelete}>Delete</Button>
                </Col>
            </Row>
            <div className="ItemCartPayment__line"></div>
        </div>


    );
}

export default ItemCartPayment;