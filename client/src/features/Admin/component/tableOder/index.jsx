import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';
import ItemProducts from '../ItemProduct';
import { Button } from 'antd';

TableOder.propTypes = {

};



function TableOder(props) {
    const { row, check, loading } = props
    const handleCheck = () => {
        check(row.idOder)
    }
    return (
        <TableRow key={row.name}>
            <TableCell component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell align="left">{row.address}</TableCell>
            <TableCell align="left">
                <ItemProducts
                    products={row.oder}
                />
            </TableCell>
            <TableCell align="left">{row.total}</TableCell>
            {row.check && (
                <TableCell align="left" onClick={handleCheck}>
                    <Button type="primary" loading={loading}> Đã duyệt
             </Button></TableCell>
            )}
            {row.check == false && (
                <TableCell align="left" onClick={handleCheck}>
                    <Button loading={loading}> Chưa duyệt
             </Button></TableCell>
            )}

        </TableRow>
    );
}

export default TableOder;