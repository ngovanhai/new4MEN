import React from 'react';
import PropTypes from 'prop-types';
import { Button, TableCell, TableRow } from '@material-ui/core';
import ItemProducts from '../ItemProduct';

TableOder.propTypes = {

};



function TableOder(props) {
    const { row, check } = props
    const handleCheck = () => {
        check(row.idOder)
    }
    return (
        <TableRow key={row.name}>
            <TableCell component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell align="right">{row.address}</TableCell>
            <TableCell align="right">
                <ItemProducts
                    products={row.oder}
                />
            </TableCell>
            <TableCell align="right">{(row.check) ? "co" : "chua"}</TableCell>
            <TableCell align="right">{row.total}</TableCell>
            <TableCell align="right" onClick={handleCheck}><Button>{(row.check) ? "hủy" : "duyệt đơn"} </Button></TableCell>
        </TableRow>
    );
}

export default TableOder;