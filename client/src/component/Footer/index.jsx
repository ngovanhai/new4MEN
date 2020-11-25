import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid } from '@material-ui/core';
import "./Footer.scss";
Footer.propTypes = {

};

function Footer(props) {
    return (
        <footer className="footer">
            <Container fixed>
                <Grid container spacing={3}>
                    <Grid item xs={7}>
                        <p>Giới thiệu | Tin tức | Chính sách bảo mật | Chính sách cookie</p>
                        <p>Copyright 2020 · Thiết kế và phát triển bởi <strong>Hải Hunter</strong> All rights reserved</p>
                        <div className="footer__line"></div>
                        <p>Chủ quản: ông Ngô Văn Hải</p>
                        <p>MST cá nhân: 0312028096</p>
                        <div className="footer__line"></div>
                        <p>Nhãn hiệu "4MEN" đã được đăng kí độc quyền tại Cục sở hữu trí tuệ Việt Nam</p>
                    </Grid>
                    <Grid item xs={5}></Grid>
                </Grid>
            </Container>
        </footer>
    );
}

export default Footer;