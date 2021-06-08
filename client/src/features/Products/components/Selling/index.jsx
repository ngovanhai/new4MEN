import React from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import ProductCard from '../Product';
import Products from 'features/Products';
import { Container } from '@material-ui/core';
import './Selling.scss';
Selling.propTypes = {

};

function Selling(props) {

    const { products, onProductView, onAddToCartClick, onPayment } = props;
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1500,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 2,
                    vertical: false
                }
            }
        ]
    };
    return (
        <Container>
            <div className="selling">
                <Slider {...settings} >
                    {products.map((product) => (
                        <ProductCard
                            product={product}
                            onProductView={onProductView}
                            onAddToCartClick={onAddToCartClick}
                            onPayment={onPayment}
                        />
                    ))}
                </Slider>
            </div>
        </Container>
    );
}

export default Selling;