import React from 'react';
import PropTypes from 'prop-types';
import './Product.scss';

import { Card, Button, Dialog } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link } from 'react-router-dom';
import FormDiaog from '../Dialog';

ProductCard.propTypes = {
    product: PropTypes.array,
    onCLickProductCLick: PropTypes.func,
    onCLickProductView: PropTypes.func,
};

function ProductCard(props) {
    const { product, onAddToCartClick, onProductView, onPayment } = props;
    const handleCLickView = () => {
        if (onProductView)
            onProductView(product)
    }
    return (
        <div className="product">
            <img src={product.image[0].url} alt="" onClick={handleCLickView} />
            <Button className="product__title" onClick={handleCLickView}>{product.tittle}</Button>
            <p className="product__price">{product.gia.toLocaleString()} Vnđ</p>
            <div className="product__overlay">
                <FormDiaog className="product__dialog"
                    product={product}
                    onProductView={onProductView}
                    onAddToCartClick={onAddToCartClick}
                    onPayment={onPayment}
                />
            </div>
        </div>

    );
}

export default ProductCard;