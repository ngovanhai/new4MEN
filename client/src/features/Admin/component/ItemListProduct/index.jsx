import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, TableCell, TableRow } from '@material-ui/core';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

ItemListProduct.propTypes = {

};

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    image: {
        maxWidth: 100
    }

});


function ItemListProduct({ row, OnClickEdit, OnClickRemove }) {
    const classes = useStyles();
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    // álkd
    const handleEdit = () => {
        setLoading1(true);
        setTimeout(() => {
            OnClickEdit(row);
            setLoading1(false);
        }, 1000)

    }
    const handleRemove = () => {
        setLoading2(true);
        setTimeout(() => {
            OnClickRemove(row);
            setLoading2(false);
        }, 1000)

    }
    return (
        <TableRow key={row.name}>
            <TableCell component="th" scope="row">
                <img src={row.image[0].url} alt="" className={classes.image} />
            </TableCell>
            <TableCell align="left" >{row.tittle} </TableCell>
            <TableCell align="left">{row.mota}
            </TableCell>
            <TableCell align="right">{row.phanloai}</TableCell>
            <TableCell align="right">{row.gia}</TableCell>
            <TableCell align="right">{row.soluong}</TableCell>
            <TableCell align="center">
                <Button
                    onClick={handleEdit}
                    loading={loading1}
                ><EditOutlined /></Button>
                <Button
                    onClick={handleRemove}
                    loading={loading2}
                ><DeleteOutlined /></Button>
            </TableCell>
        </TableRow>
    );
}

export default ItemListProduct;