import React, { useEffect, useState } from 'react';

import { Button, Container, Grid, MenuItem, TextField } from '@material-ui/core';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import ProductList from 'features/Products/components/ProductsList';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb } from 'antd';
import { useForm } from "react-hook-form";
import Select from "react-select";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import "./Item.scss";
import { SIZE_QUAN_AO, SIZE_SHOES } from 'contants/size';
import { AMOUNT } from 'contants/amount';
import { ADDRESS } from 'contants/address';
import { addProductToCart } from 'features/Cart/cartSlice';

SelectProduct.propTypes = {

};


function SelectProduct(props) {
    const dispatch = useDispatch();
    const history = useHistory();


    const { handleSubmit } = useForm();
    const { productId } = useParams();
    const products = useSelector(state => state.products.allProducts);
    const [product, setProduct] = useState([])
    const [selectedValue_shoes, setSelectedValue_shoes] = useState();
    const [selectedValue_quan, setSelectedValue_quan] = useState();
    const [selectedValue_amount, setSelectedValue_amount] = useState();

    const [click, setClick] = useState(1);

    const handleChange_amount = (e) => {
        setSelectedValue_amount(e.value);
    }
    const handleChange_quan = (e) => {
        setSelectedValue_quan(e.value)
    }
    const handleChange_shoes = (e) => {
        setSelectedValue_shoes(e.value);
    }

    function handleClickAddCart(product) {
        const item = { ...product }
        dispatch(addProductToCart(item))

    }
    const handleClickView = (product) => {
        const urlView = `/4MEN/${product._id}`;
        history.push(urlView);
    }
    function handleCLickPayment(product) {
        const item = { ...product }
        dispatch(addProductToCart(item));
        history.push("/thanh-toan");
    }

    const onSubmit = data => {

        if (click == 1) {
            const action = addProductToCart({ ...product, "size": (selectedValue_shoes) ? selectedValue_shoes : selectedValue_quan, "slmua": selectedValue_amount, "idCart": Math.trunc(Math.random() * 1000) });
            console.log(action);
            dispatch(action);
            history.push('/thanh-toan')

        } else {
            const action = addProductToCart({ ...product, "idCart": Math.trunc(Math.random() * 1000), "size": (selectedValue_shoes) ? selectedValue_shoes : selectedValue_quan, "slmua": selectedValue_amount });
            console.log(action);
            dispatch(action);

        }
    }

    const newProduct = products.filter(x => x.phanloai === product.phanloai)

    function scrollWin() {
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        if (productId) {
            products.forEach(item => {
                if (item._id === productId) setProduct(item)
            })
        }
        scrollWin()
    })
    if (product.length === 0) return null;
    return (
        <div className="GroupProduct">
            <div>
                <Breadcrumb>
                    <div className="GroupProduct__brumb">
                        <Container fixed className="GroupProduct__brumbsitem">
                            <Breadcrumb.Item ><Link to="/">4 MEN</Link></Breadcrumb.Item>
                            <Breadcrumb.Item ><Link to={`/category/${product.phanloai}`}> {product.phanloai}</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to={`/${productId}`}>{product.tittle}</Link></Breadcrumb.Item>
                        </Container>
                    </div>
                </Breadcrumb>
                <Container fixed>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <img src={product.image[0].url} alt="" className="GroupProduct__image" />
                        </Grid>


                        <Grid item xs={7}>
                            <h2>{product.tittle}</h2>
                            <p>Gi?? b??n : {product.gia.toLocaleString()} Vn??</p>
                            <p>Gi???m gi?? : {product.sale} %</p>
                            <p>T??nh tr???ng : {(product.gia === 0) ? "H???t H??ng" : "C??n H??ng"}</p>
                            <hr />
                            <h4>Danh M???c :<Link to={`/category/${product.phanloai}`}> {product.phanloai}</Link></h4>
                            <p>??i???m n???i b???t : </p>
                            <p>??o Len Xanh ??en AL123 ch???t li???u len cao c???p, m???m m???n, ????? ch???y t??? nhi??n, kh??? n??ng ????n h???i t???t v?? ?????c bi???t l?? gi??? ???m t???t h??n len th?????ng nh??ng l???i x???p nh???. Ki???u d??ng c??? tr??n, tay d??i ????n gi???n d??? m???c, d??? ph???i trang ph???c.</p>
                            <hr />
                            <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "0px" }}>
                                <div className="GroupProduct__option">
                                    <div className="GroupProduct__select">
                                        <p>Size *</p>
                                        {(product.phanloai !== "giay") ? (
                                            <Select
                                                options={SIZE_QUAN_AO}
                                                value={SIZE_QUAN_AO.find((obj) => obj.value === setSelectedValue_quan)}
                                                onChange={handleChange_quan}
                                            />
                                        ) :
                                            (
                                                <Select

                                                    options={SIZE_SHOES}
                                                    value={SIZE_QUAN_AO.find((obj) => obj.value === setSelectedValue_shoes)}
                                                    onChange={handleChange_shoes}
                                                />
                                            )}

                                    </div>
                                    <div className="GroupProduct__select">
                                        <p>S??? l?????ng *</p>
                                        <Select

                                            value={SIZE_QUAN_AO.find((obj) => obj.value === selectedValue_amount)}
                                            options={AMOUNT}
                                            onChange={handleChange_amount}
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div className="GroupProduct__action">
                                    <Button className="GroupProduct__btnBuy" variant="contained" onClick={() => setClick(1)} color="secondary" type="submit"><ShoppingCartIcon /> ????ng k?? mua</Button>
                                    <Button className="GroupProduct__btnAdd" variant="outlined" onClick={() => setClick(2)} color="secondary" type="submit" > + Th??m v??o gi??? h??ng</Button>
                                </div>
                            </form>
                            <div className="GroupProduct__Address">
                                <h4>?????a ch??? showroom ??ang b??n s???n ph???m n??y:</h4>
                                {ADDRESS.map(adress => (
                                    <p className="GroupProduct__AddressItem"> <li>{adress}</li></p>
                                ))}
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <div className="GroupProduct__description">
                                <h3>M?? t??? s???n ph???m</h3>
                                <h4>{product.tittle}</h4>
                                <p>{product.mota}</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4} className="GroupProduct__endow">
                            <Grid container>
                                <Grid item xs={2}>
                                    <p><strong> 4MEN<sup>TM </sup></strong></p>
                                </Grid>
                                <Grid item xs={10}>
                                    <div className="GroupProduct__line"></div>
                                </Grid>
                            </Grid>
                            <li><span className="GroupProduct__so">1 </span> Giao h??ng TO??N QU???C</li>
                            <li><span className="GroupProduct__so">2 </span>Thanh to??n khi nh???n h??ng</li>
                            <li><span className="GroupProduct__so">3 </span>?????i tr??? trong 15 ng??y</li>
                            <li><span className="GroupProduct__so">4 </span>Ch???t l?????ng ?????m b???o</li>
                            <li><span className="GroupProduct__so">5 </span>H??ng lu??n s???n c??</li>
                            <li><span className="GroupProduct__so">6 </span>MI???N PH?? v???n chuy???n:</li>
                            <p>?? ????n h??ng tr??n 1 tri???u ?????ng</p>
                        </Grid>
                    </Grid>
                    <div className="GroupProduct__more">
                        <Grid container>
                            <Grid item xs={12} md={4}>
                                <h3>S???N PH???M C??NG DANH M???C</h3>
                            </Grid>
                            <Grid item xs={0} md={8}>
                                <div className="GroupProduct__line"></div>
                            </Grid>
                        </Grid>

                        <ProductList
                            products={newProduct}
                            onAddToCartClick={handleClickAddCart}
                            onProductView={handleClickView}
                            onPayment={handleCLickPayment}
                        />
                    </div>
                </Container>
            </div>
        </div>

    );
}

export default SelectProduct;