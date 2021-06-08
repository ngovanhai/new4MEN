import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core';

import "./Content.scss";
import ItemContent from '../ItemContent';

Content.propTypes = {

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

function Content(props) {
    const products = useSelector(state => state.products.allProducts);
    const { onClickView } = props;

    let filterData = [...products];
    filterData = filterData.sort(function (a, b) {
        return b.createdAt.localeCompare(a.createdAt);
    })
    filterData = filterData.slice(0, 5);

    return (
        <div id="content" className="Content" >
            <Grid container>
                <Grid item xs={6}>
                    <p className="Content__label">Sản phẩm hot nhất</p>
                </Grid>
                <Grid item xs={6}>
                    <div className="Content__line"></div>
                </Grid>
            </Grid>
            {filterData.map(product => (
                <ItemContent
                    product={product}
                    onClickView={onClickView}
                />
            ))}
        </div>
    );
}

export default Content;