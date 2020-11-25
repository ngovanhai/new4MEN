import React from 'react';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from 'features/Cart/cartSlice';

import { Container, Grid } from '@material-ui/core';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Breadcrumb } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import ProductCard from 'features/Products/components/Product';
import "./Category.scss";
import Content from 'features/Products/components/Content';

Category.propTypes = {

};
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

}));

function Category(props) {

    const products = useSelector(state => state.products);
    const { category } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const newProduct = [...products];
    let brums = "";
    let filterData;

    if (category === "moi-nhat") {
        brums = "Mới Nhất";
        filterData = newProduct.sort((a, b) => {
            return b.createdAt.localeCompare(a.createdAt);
        });
    }
    else if (category === "khuyen-mai") {
        brums = "Khuyến Mãi";
        filterData = newProduct.filter(
            product => product.sale !== 0
        )
    }
    else {
        switch (category) {
            case "quan-nam":
                brums = "Quần Nam";
                break;
            case "thatlung":
                brums = "Phụ Kiện";
                break;
            case "giay":
                brums = "Giày Dép Nam"
            default:
                break;
        }
        filterData = newProduct.filter(
            product => product.phanloai === category,
        );
    }

    function handleClickAddCart(product) {
        return new Promise(resolve => {
            setTimeout(() => {
                const item = { ...product, "idCart": Math.trunc(Math.random() * 1000) }
                const action = addProductToCart(item);
                dispatch(action);
                alert("them vao gio hanh thanh cong");
                resolve(true);
            }, 1000)
        })

    }

    const handleClickView = (product) => {
        const urlView = `/4MEN/${product._id}`;
        history.push(urlView);
    }
    function handleCLickPayment(product) {
        return new Promise(resolve => {
            setTimeout(() => {
                const item = { ...product, "idCart": Math.trunc(Math.random() * 1000) }
                const action = addProductToCart(item);
                dispatch(action);
                alert("them vao gio hanh thanh cong");
                history.push("/thanh-toan");
                resolve(true);
            }, 1000)
        })

    }

    return (
        <div className="GroupProduct">
            <Breadcrumb className=" GroupProduct__brumb">
                <Container fixed>
                    <div className="GroupProduct__item">
                        <Breadcrumb.Item ><Link to="/">4 MEN</Link></Breadcrumb.Item>
                        <Breadcrumb.Item ><Link to={`/category/${category}`}>{brums}</Link></Breadcrumb.Item>
                    </div>
                </Container>
            </Breadcrumb>
            <Container fixed>
                <p className="GroupProduct__nameGroup"><strong>{brums}</strong></p>
                <h3 className="GroupProduct__filter" >lọc sản phẩm : </h3>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <p className="GroupProduct__CartList"><ArrowForwardIosIcon className="GroupProduct__icon" />Quần áo nam</p>
                        <p className="GroupProduct__CartList"><ArrowForwardIosIcon className="GroupProduct__icon" />Túi xách nam</p>
                        <p className="GroupProduct__CartList"><ArrowForwardIosIcon className="GroupProduct__icon" />Thời Trang hot nhất</p>

                    </Grid>
                    <Grid item xs={12} md={4}>
                        <p className="GroupProduct__CartList"><ArrowForwardIosIcon className="GroupProduct__icon" />Túi xách nam</p>
                        <p className="GroupProduct__CartList"><ArrowForwardIosIcon className="GroupProduct__icon" />Thời Trang hot nhất</p>
                    </Grid>
                </Grid>
                <div className="GroupProduct__line"></div>
                <div className="GroupProduct__ProductList">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={9}>
                            <Grid container spacing={3}>
                                {filterData.map((product, index) => (
                                    <Grid key={index} item xs={12} md={6} lg={4}>
                                        <ProductCard
                                            product={product}
                                            onAddToCartClick={handleClickAddCart}
                                            onProductView={handleClickView}
                                            onPayment={handleCLickPayment}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={0} md={3}>
                            <Content
                                onClickView={handleClickView}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div >
    );
}

export default Category;