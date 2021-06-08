import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@material-ui/core';
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
    const { page, rowsPerPage, setPage, setRowsPerPage, sort, category, products, setProducts, totalProducts, fetchData } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const HandleRemoveProduct = (product) => {
        const ProductId = product._id
        setProducts(products.filter(product => product._id !== ProductId))

        const action = DeleteProduct(ProductId);
        dispatch(action);
    }
    const HandleEditProduct = async (product) => {
        const productId = product._id;
        history.push("/addedit/" + productId);
    }
    const handleChangePage = async (event, newPage) => {
        setPage(newPage)
    };

    const handleChangeRowsPerPage = async (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
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
                        <TableCell align="right" >Category</TableCell>
                        <TableCell align="right">Giá</TableCell>
                        <TableCell align="right">Số lượng</TableCell>
                        <TableCell align="center">Hành động</TableCell>
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
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10, 15, 30]}
                            count={totalProducts}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

export default TableListProducts;