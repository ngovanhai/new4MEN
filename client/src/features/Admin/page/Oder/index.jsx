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




Oder.propTypes = {

};



const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


function Oder(props) {
    const classes = useStyles();
    const [oder, setOder] = useState([])
    const getOder = async () => {
        const productOder = await oderApi.getAll();
        productOder.sort((a, b) => {
            return b.createdAt.localeCompare(a.createdAt);
        });
        setOder(productOder)
    }

    const check = (idOder, check) => {
        const checkApi = async () => {
            await oderApi.updateOder(idOder)
        }
        checkApi()
        getOder()
    }

    useEffect(() => {
        getOder()
    }, [])
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Tên khách hàng</TableCell>
                        <TableCell align="right">Địa chỉ</TableCell>
                        <TableCell align="right">Đơn hàng</TableCell>
                        <TableCell align="right">Check</TableCell>
                        <TableCell align="right">Tổng Tiền</TableCell>
                        <TableCell align="right">Duyệt đơn</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {oder.map((row) => (
                        <TableOder
                            row={row}
                            check={check}
                        />

                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Oder;