import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from 'features/Cart/cartSlice';
import { Container, Grid, TablePagination } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Breadcrumb } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import ProductCard from 'features/Products/components/Product';
import "./Category.scss";
import Pagination from '@material-ui/lab/Pagination';
import Content from 'features/Products/components/Content';
import productApi from 'api/productsAPI';
import Loading from 'component/Loading/Loading';
import { AddToFilterProducts } from 'features/Products/productSlice';

Category.propTypes = {

};
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

}));

function Category(props) {
    const products = useSelector(state => state.products.filterProducts);
    const { category } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [brums, setBrums] = useState("")
    const [categories, setCategories] = useState("");
    const [count, setCount] = useState(0);


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
    function handleChangePage(event, value) {
        setPage(value)
    }
    const fetchData = async () => {
        if (category !== "search") {
            setLoading(true)
            let res = await productApi.getAll(page, category)
            const action = AddToFilterProducts(res.products);
            dispatch(action);
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [page])
    useEffect(() => {
        setCategories(category)
    }, [category])
    useEffect(() => {
        switch (categories) {
            case "quan-nam":
                setBrums("Quần Nam");
                break;
            case "thatlung":
                setBrums("Phụ Kiện");
                break;
            case "giay-dep":
                setBrums("Giày Dép Nam");
                break;
            case "phu-kien":
                setBrums("Phụ kiện");
                break;
            case "moi-nhat":
                setBrums("Mới nhất");
                break;
            case "khuyen-mai":
                setBrums("khuyến mãi");
                break;
            case "search":
                setBrums("Tìm Kiếm");
                break;
            default:
                break;
        }
        fetchData()
    }, [categories])
    useEffect(() => {
        fetchData()
    }, [])
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
                <Grid container spacing={3}>
                </Grid>

                <div className="GroupProduct__ProductList">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={9}>
                            {loading === false && (
                                <Grid container spacing={3}>
                                    {products.map((product, index) => (
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
                            )}
                            {loading === true && (
                                <Grid container spacing={3}>
                                    <Loading></Loading>
                                </Grid>
                            )}
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Pagination count={count} onChange={handleChangePage} variant="outlined" shape="rounded" size="small" />
                            </div>
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