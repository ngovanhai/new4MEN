import React, { useEffect, useRef, useState } from 'react';
import 'antd/dist/antd.css';
import './style.scss';


import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { PhoneOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { IconButton, Button, Container, Paper, InputBase } from '@material-ui/core';
import { Input, Space, Row, Col } from 'antd';
import ListCart from 'features/Cart/component/ListCart';
import Headroom from 'react-headroom';
import productApi from 'api/productsAPI';
import { AddToFilterProducts } from 'features/Products/productSlice';
import { useDispatch } from 'react-redux';
import Search from 'antd/lib/input/Search';
import logo from "asset/image/logo.png"





Header.propTypes = {

};
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
}));
function Header(props) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const textInput = useRef(null);
    const [textSearch, SetTextSearch] = useState("")
    function linkto(text) {
        history.push(`/category/${text}`)
    }

    const onSearch = async (value) => {
        const res = await productApi.search(value)
        const action = AddToFilterProducts(res);
        dispatch(action);
        history.push(`/category/search`)
    }

    function handleChange(event) {
        const text = event.target.value;
        SetTextSearch(text)
    }
    // useEffect(() => {
    //     setTimeout(() => {
    //         handleClick()
    //     }, 1000)

    // }, [textSearch])

    async function handleClick() {
        const res = await productApi.search(textSearch)
        const action = AddToFilterProducts(res);
        dispatch(action);
        history.push(`/category/search`)
    }

    return (
        <Headroom className="fixNav" style={{ height: "130px" }}>
            <div className="navbar">
                <div className={classes.root}>
                    <Container fixed>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <p className="phone" style={{ display: "flex", alignItems: "center" }}><PhoneOutlined /> <span style={{ marginLeft: "10px" }}> Hotline: 0339966506</span></p>
                            </Grid>
                            <Grid item xs={8}>
                                <Row className="gioithieu">
                                    <Col xs="auto" className="information">
                                        <Button className="ItemMenu"> <Link to="#" className="labelMenu">Cách chọn size |</Link></Button>
                                        <Button className="ItemMenu"> <Link to="#" className="labelMenu"> Chính sách khách vip |</Link></Button>
                                        <Button className="ItemMenu"> <Link to="#" className="labelMenu"> Giới thiệu </Link></Button>
                                    </Col>
                                </Row>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
            <div className="menu">
                <Container fixed>
                    <div className={classes.root}>
                        <Grid container spacing={3} className="submenu1">
                            <Grid item xs={0} md={3}>
                                <Link to="/">  <img src={logo} alt="" style={{ height: "70px" }} /></Link>
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <ul className="submenu">
                                    <Button className="ItemMenu" onClick={() => linkto("moi-nhat")}><Link to="/category/moi-nhat" className="labelNavbar" >MỚI NHẤT</Link></Button>
                                    <Button className="ItemMenu" onClick={() => linkto("quan-nam")}><Link to="/category/quan-nam" className="labelNavbar">QUẦN NAM</Link></Button>
                                    <Button className="ItemMenu" onClick={() => linkto("phu-kien")}><Link to="/category/phu-kien" className="labelNavbar">PHỤ KIỆN </Link></Button>
                                    <Button className="ItemMenu" onClick={() => linkto("giay-dep")}><Link to="/category/giay-dep" className="labelNavbar">GIÀY DÉP NAM</Link></Button>
                                    <Button className="ItemMenu" onClick={() => linkto("khuyen-mai")} ><Link to="/category/khuyen-mai" className="labelNavbar">KHUYẾN MÃI</Link></Button>
                                </ul>
                            </Grid>
                            <Grid item xs={0} md={3}>
                                <div className="CartSearch" style={{ display: "flex", alignItems: "center" }}>
                                    <IconButton><ListCart
                                    /></IconButton>
                                    {/* <Search placeholder="input search text" onSearch={onSearch} style={{ width: "200px" }} /> */}
                                    <div style={{ width: "200px", display: "flex", }}>
                                        <input className="ant-input" type="text" ref={textInput} onChange={handleChange} ></input>
                                        <SearchOutlined style={{ border: "1px solid #d9d9d9", fontSize: "20px", display: "flex", alignItems: "center", padding: "0px 5px", borderLeft: "none" }} onClick={handleClick} />
                                    </div>
                                </div>
                            </Grid>
                        </Grid>

                    </div>
                </Container>
            </div>
        </Headroom>
    );
}


export default Header;