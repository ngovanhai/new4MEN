import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ButtonBase, Grid, Paper } from '@material-ui/core';
import ItemCart from '../ItemCart';
import { useHistory } from 'react-router-dom';

ItemCard.propTypes = {
    item: PropTypes.array,
    OnClickDeleteItemCart: PropTypes.func,
};
const useStyles = makeStyles({
    root: {
        width: "100%",
        maxWidth: 600,
        position: "relative",
        overflow: "auto",
        maxHeight: 600

    },

    image: {
        width: 128,
        height: 100,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    tittle: {
        fontSize: 15
    }

})


function ItemCard(props) {
    const classes = useStyles();
    const history = useHistory();
    const sendOder = () => {
        history.push('/thanh-toan')
    }

    const { item, OnClickDeleteItemCart } = props;
    const num = () => {
        let gia;
        if (item.length) {
            gia = item.map(x => +(x.gia * parseInt(x.slmua))).reduce((a, b) => a + b).toLocaleString()
        }
        else {
            gia = 0;
        }
        return gia;
    }
    return (
        <div>
            <Card className={classes.root}>
                <CardContent>có {item.length} sản phẩm trong rỏ</CardContent>
                {
                    item.map(it => (
                        <ItemCart key={it.id}
                            it={it}
                            OnClickDeleteItemCart={OnClickDeleteItemCart}
                        />
                    ))
                }

                <CardActions>
                    <Typography>Tổng : {num()} Vnđ</Typography>
                    <br />

                </CardActions>
                <CardActions>
                    <Button variant="contained" size="small" color="secondary" onClick={sendOder}>
                        Gửi đơn hàng
              </Button>
                </CardActions>
            </Card>

        </div>
    );
}

export default ItemCard;