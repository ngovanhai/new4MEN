import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import oderApi from 'api/oderApi';
import TableOder from 'features/Admin/component/tableOder';
import { addProductToCart } from 'features/Cart/cartSlice';
import { TableFooter, TablePagination } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AddToOder } from 'features/Admin/oderSlice';



Oder.propTypes = {

};



const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


function Oder(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0);
    const [rowsPerpage, setRowsPerPage] = useState(10);
    const dispatch = useDispatch();
    const oders = useSelector(state => state.oder);
    const getOder = async () => {
        const productOder = await oderApi.getAll(page + 1, rowsPerpage);
        productOder.order.sort((a, b) => {
            return b.createdAt.localeCompare(a.createdAt);
        });
        const action = AddToOder(productOder)
        dispatch(action);
    }

    const check = async (idOder) => {
        const res = await oderApi.updateOder(idOder);
        if (res.status == true) {
            getOder()
        }
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    useEffect(() => {
        getOder()
    }, [page, rowsPerpage])
    useEffect(() => {
        if (oders.order.length == 0) {
            getOder()
        }
    }, [])

    return (
        <TableContainer component={Paper}>
            {
                oders.order.length !== 0 && (
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Tên khách hàng</TableCell>
                                <TableCell align="left">Địa chỉ</TableCell>
                                <TableCell align="left">Đơn hàng</TableCell>
                                <TableCell align="left">Tổng Tiền</TableCell>
                                <TableCell align="left">Duyệt đơn</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {oders.order.map((row) => (
                                <TableOder
                                    row={row}
                                    check={check}
                                    loading={loading}
                                />

                            ))}
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[10, 15, 30]}
                                    count={oders.totalOder}
                                    rowsPerPage={rowsPerpage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                )
            }
        </TableContainer>
    );
}

export default Oder;