import React from 'react';
import PropTypes from 'prop-types';
import Sliders from "react-slick";

import './Slider.scss'

Carousels.propTypes = {

};


const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,

};

function Carousels(props) {
    return (
        <div className="slick">
            <Sliders {...settings}>
                <div>
                    <img src="https://4menshop.com/images/thumbs/slides/banner-top-trang-chu-3-slide-21.png?t=1597290274" alt="" className="slick__img" />
                </div>
                <div>
                    <h3><img src="https://4menshop.com/images/thumbs/slides/banner-top-trang-chu-2-slide-20.png?t=1598588937" alt="" className="slick__img" /></h3>
                </div>

            </Sliders>
        </div>
    );
}

export default Carousels;