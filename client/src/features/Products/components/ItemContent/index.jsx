import React from 'react';
import PropTypes from 'prop-types';

import { Button, ButtonBase, CardContent, Grid, makeStyles } from '@material-ui/core';

import "./ItemContent.scss";

ItemContent.propTypes = {

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
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    tittle: {
        fontSize: 13,
        padding: 0
    }

})

function ItemContent(props) {
    const { product, onClickView } = props;
    const classes = useStyles();

    const HandleClickView = () => {
        if (onClickView) onClickView(product);
    }
    return (
        <div className="ItemContent">
            <Grid container>
                <Grid item>
                    <ButtonBase className={classes.image} onClick={HandleClickView}>
                        <img className={classes.img} alt="complex" src={product.image[0].url} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={1} padding={1}>
                        <Grid item xs>
                            <CardContent gutterBottom variant="subtitle1" className="ItemContent__title">
                                <Button onClick={HandleClickView} className="ItemContent__BtnView">{product.tittle}</Button>
                                <br />
                                {product.gia.toLocaleString()} VnĐ
                            </CardContent>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </div >
    );
}

export default ItemContent;