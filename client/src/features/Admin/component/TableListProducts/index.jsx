import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import ItemListProduct from '../ItemListProduct';
import { useDispatch, useSelector } from 'react-redux';
import { AddToProduct, DeleteProduct } from 'features/Products/productSlice'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import productApi from 'api/productsAPI';

TableListProducts.propTypes = {

};
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },

});



function TableListProducts(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector(state => state.products)


    const HandleRemoveProduct = (product) => {
        const ProductId = product._id
        const action = DeleteProduct(ProductId);
        dispatch(action);
    }
    const HandleEditProduct = (product) => {
        const productId = product._id;
        console.log(productId);
        history.push("/addedit/" + productId);
    }
    useEffect(() => {
        const getProducts = async () => {
            const res = await productApi.getAll()
            dispatch(AddToProduct(res))
        }
        getProducts();
    }, [])
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Hình ảnh</TableCell>
                        <TableCell align="left" className={classes.name}>
                            Tên Sản Phẩm
                        </TableCell>
                        <TableCell align="left">Mô Tả</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Giá</TableCell>
                        <TableCell align="right">Số lượng</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((row, index) => (
                        <ItemListProduct
                            key={index}
                            row={row}
                            OnClickEdit={HandleEditProduct}
                            OnClickRemove={HandleRemoveProduct}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableListProducts;