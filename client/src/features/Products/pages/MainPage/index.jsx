import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';


import Carousels from 'component/Carousel';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import ProductList from 'features/Products/components/ProductsList';
import { Container } from '@material-ui/core';

import { addProductToCart } from 'features/Cart/cartSlice';

import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Categoris from 'features/Products/components/categoris';

import Selling from 'features/Products/components/Selling';
import './MainPage.scss';
import productApi from 'api/productsAPI';
import { AddToProduct } from 'features/Products/productSlice';





MainPage.propTypes = {

};
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));


function MainPage(props) {
    const classes = useStyles()
    const products = useSelector(state => state.products.allProducts);
    const dispatch = useDispatch();
    const history = useHistory();
    let ProductNew = [...products];
    const cart = (localStorage.getItem("cart"))



    function sortProductsNew() {
        const filterData = ProductNew.sort((a, b) => {
            return b.createdAt.localeCompare(a.createdAt);
        });
        return filterData;
    }
    function sortProductsale() {
        const filterData = ProductNew.sort((a, b) => {
            return b.daban - a.daban;
        });
        return filterData;
    }


    const ProductSale = products.filter(product => product.sale !== 0);
    function handleClickAddCart(product) {
        const item = { ...product }
        dispatch(addProductToCart(item))

    }

    useEffect(() => {
        const fetchProductsList = async () => {
            try {
                const response = await productApi.getAll();
                dispatch(AddToProduct(response.products));
            } catch (err) {
                console.log('failed to fetch product list :')
            }
        }
        fetchProductsList();
    }, []);


    const handleClickView = (product) => {
        const urlView = `/4MEN/${product._id}`;
        history.push(urlView);
    }
    function handleCLickPayment(product) {
        const item = { ...product }
        dispatch(addProductToCart(item));
        history.push("/thanh-toan");
    }

    return (
        <div>
            <Carousels></Carousels>
            <Container fixed className="main">
                <div className="main__hot">
                    <h1 className="main__title">TH???I TRANG HOT NH???T</h1>
                    <p>----------------------<TurnedInNotIcon />----------------------</p>
                    <p>S???n ph???m th???i trang nam ???????c quan t??m nhi???u nh???t, trong b??? s??u t???p th???i trang t???i shop 4MEN</p>
                    <ProductList
                        products={products.slice(0, 8)}
                        onAddToCartClick={handleClickAddCart}
                        onProductView={handleClickView}
                        onPayment={handleCLickPayment}
                    />
                </div>
                <Categoris />
                <div className="main__new">
                    <h1 className="main__title">TH???I TRANG M???I NH???T</h1>
                    <p>----------------------<TurnedInNotIcon />----------------------</p>
                    <p>Danh s??ch s???n ph???m th???i trang nam m???i nh???t ???????c c???p nh???t trong b??? s??u t???p th???i trang 4MEN</p>

                    <ProductList
                        products={sortProductsNew().slice(4, 8)}
                        onAddToCartClick={handleClickAddCart}
                        onProductView={handleClickView}
                        onPayment={handleCLickPayment}
                    />
                </div>
                <div className="main__new">
                    <h1 className="main__title">TH???I TRANG B??N CH???Y NH???T</h1>
                    <p>----------------------<TurnedInNotIcon />----------------------</p>
                    <p>Danh s??ch s???n ph???m th???i trang nam b??n ch???y, s???n ph???m th???i trang hot trong b??? s??u t???p th???i trang 4MEN</p>
                    <Selling
                        products={sortProductsale()}
                        onAddToCartClick={handleClickAddCart}
                        onProductView={handleClickView}
                        onPayment={handleCLickPayment}
                    />
                </div>

            </Container>
        </div >

    );
}

export default MainPage;