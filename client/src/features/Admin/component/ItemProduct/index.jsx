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
                <div>
                    <img src={x.image[0].url} alt="" style={{ maxWidth: 100 }} />
                    <p>{x.tittle}</p>
                    <p>size : {x.size} số lượng : {x.slmua}</p>
                </div>

            ))}
        </div>
    );
}

export default ItemProducts;