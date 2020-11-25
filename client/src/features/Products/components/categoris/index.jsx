import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import "./Categoris.scss";

Categoris.propTypes = {

};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

function Categoris(props) {
    const classes = useStyles();

    return (
        <div className="categoris">
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={3} className="categoris__itemCategory">
                        <Link to="/category/moi-nhat" >
                            <img src="https://4menshop.com/images/thumbs/slides/slide-1-trang-chu-slide-1.png?t=1537897385" alt="" className="categoris__new" />
                        </Link>
                    </Grid>
                    <Grid item xs={6} className="categoris__itemCategory">
                        <Link to="/category/thatlung" > <img src="https://4menshop.com/images/thumbs/slides/slide-2-trang-chu-slide-2.png?t=" alt="" className="categoris__phukien" /></Link>
                        <Link to="/category/giay" > <img src="https://4menshop.com/images/thumbs/slides/slide-3-trang-chu-slide-3.png?t=" alt="" className="categoris__giay" /></Link>
                    </Grid>
                    <Grid item xs={3} className="categoris__itemCategory">
                        <Link to="/category/quan" > <img src="https://4menshop.com/images/thumbs/slides/slide-4-trang-chu-slide-4.png?t=" alt="" className="categoris__quan" /></Link>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Categoris;