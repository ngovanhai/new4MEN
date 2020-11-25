import React from 'react';
import 'antd/dist/antd.css';
import './style.scss';


import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { PhoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { IconButton, Button, Container } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Row, Col } from 'antd';
import ListCart from 'features/Cart/component/ListCart';
import Headroom from 'react-headroom';






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
}));
function Header(props) {
    const classes = useStyles();



    return (
        <Headroom className="fixNav">
            <div className="navbar">
                <div className={classes.root}>
                    <Container fixed>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <p className="phone"><PhoneOutlined />Hotline: 0339966506</p>
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
                                <Link to="/">  <img src="" alt="" /></Link>
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <ul className="submenu">
                                    <Button className="ItemMenu" ><Link to="/category/moi-nhat" className="labelNavbar" >MỚI NHẤT</Link></Button>
                                    <Button className="ItemMenu" ><Link to="/category/quan-nam" className="labelNavbar">QUẦN NAM</Link></Button>
                                    <Button className="ItemMenu" ><Link to="/category/phu-kien" className="labelNavbar">PHỤ KIỆN </Link></Button>
                                    <Button className="ItemMenu" ><Link to="/category/giay-dep" className="labelNavbar">GIÀY DÉP NAM</Link></Button>
                                    <Button className="ItemMenu" ><Link to="/category/khuyen-mai" className="labelNavbar">KHUYẾN MÃI</Link></Button>
                                </ul>
                            </Grid>
                            <Grid item xs={0} md={3}>
                                <div className="CartSearch">
                                    <IconButton><ListCart
                                    /></IconButton>
                                    <IconButton><SearchIcon></SearchIcon></IconButton>
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