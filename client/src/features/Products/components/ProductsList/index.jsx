import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ProductCard from '../Product';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));


ProductList.propTypes = {
    ProductList: PropTypes.array,
    onCLickProductCLick: PropTypes.func,
    onProductView: PropTypes.func
};
function ProductList(props) {
    const classes = useStyles();

    const { products, onAddToCartClick, onProductView, onPayment } = props;
    console.log(products);
    return (
        <div className="container">
            <div className={classes.root} >
                <Grid container spacing={0}>
                    {products.map((product) => (
                        <Grid key={product._id} item xs={12} sm={6} md={3}>
                            <ProductCard
                                product={product}
                                onAddToCartClick={onAddToCartClick}
                                onProductView={onProductView}
                                onPayment={onPayment}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>

    );
}

export default ProductList;