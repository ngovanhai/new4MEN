import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import "./FormPay.scss"
import { Grid, Select, TextField } from '@material-ui/core';

FormPay.propTypes = {

};

const defaultValues = {

    size: "",
    amount: ""
};

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120

    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    sizee: {
        maxWidth: 200
    }
}));
function FormPay(props) {
    const { product, onPayment, handleClose, onAddToCartClick, onCLickProductView } = props;
    const { handleSubmit, register, reset, control } = useForm({ defaultValues });
    const [handlesubmit, setHandleSubmit] = useState(1);
    const classes = useStyles();

    const onSubmit = (data) => {
        if (handlesubmit === 2) {
            onAddToCartClick({ ...product, ...data, "idCart": Math.trunc(Math.random() * 1000) });
        }
        else {
            onPayment({ ...product, ...data, "idCart": Math.trunc(Math.random() * 1000) })
        }
    }
    const handleView = () => {
        if (onCLickProductView) onCLickProductView(product);
    }

    return (
        <div className="FormPay">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Giá Bán : {product.gia.toLocaleString()} VnĐ</h1>
                <h3 name="price">Giá Gốc : {product.gia.toLocaleString()} VnĐ</h3>
                <h4>Tình Trạng : còn hàng</h4>
                <hr />
                <InputLabel id="demo-simple-select-label">Size</InputLabel>

                <Controller
                    as={
                        <Select>
                            <MenuItem value={28}>28</MenuItem>
                            <MenuItem value={29}>29</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={31}>31</MenuItem>
                            <MenuItem value={32}>32</MenuItem>
                        </Select>
                    }
                    name="size"
                    control={control}
                />
                <br />
                <Grid item xs={6}>
                    <TextField
                        id="valor"
                        label="Số lượng"
                        name="slmua"
                        type="number"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        inputRef={register({
                            required: "Insira um valor",
                            pattern: {
                                value: /^([1-9]{1}[\d]{0,2}(\.[\d]{3})*(,[\d]{0,2})?|[1-9]{1}[\d]{0,}(,[\d]{0,2})?|0(,[\d]{0,2})?|(,[\d]{1,2})?)$/,
                                message: "số Lượng"
                            }
                        })}
                    />
                </Grid>
                <br />
                <hr />

                <Button variant="contained" color="secondary" onClick={() => setHandleSubmit(1)} type="submit"><ShoppingCartIcon /> Đăng kí mua</Button>
                <Button variant="outlined" color="secondary" onClick={() => setHandleSubmit(2)} type="submit"  > + Thêm vào giỏ hàng</Button>
                <hr />
                <Button variant="contained" className="FormPay__btnView" onClick={handleView} color="primary">Xem chi tiết</Button>
                <br />
                <Button variant="outlined" color="primary" className="FormPay__btnCLose" onClick={handleClose}>Đóng cửa sổ</Button>
            </form>

        </div>
    );
}

export default FormPay;