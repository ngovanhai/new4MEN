import React from 'react';
import PropTypes from 'prop-types';

ItemProducts.propTypes = {

};

function ItemProducts(props) {
    const { products } = props
    const itemProducts = []
    for (const i in products) {
        itemProducts.push(products[i])
    }
    return (
        <div>
            {itemProducts.map(x => (
                <div style={{ display: "flex", padding: "10px" }}>
                    <img src={x.image[0].url} alt="" style={{ maxWidth: "70px" }} />
                    <div style={{ marginLeft: "20px", display: "grid" }}>
                        <p >{x.tittle}</p>
                        <p style={{ float: "left" }}>Size : {x.size} </p>
                        <p >Số lượng : {x.slmua}</p>
                    </div>
                </div>

            ))}
        </div>
    );
}

export default ItemProducts;