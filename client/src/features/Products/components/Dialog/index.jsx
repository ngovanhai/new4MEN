import React, { useState, useEffect, useRef } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Slider from "react-slick";
import './Dialog.scss';
import FormPay from '../FormPay';



FormDialog.propTypes = {

};
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        //color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


function FormDialog(props) {
    const classes = useStyles();
    const { product, onAddToCartClick, onProductView, onPayment } = props;
    const [open, setOpen] = React.useState(false);
    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();
    const slider1 = useRef(null);
    const slider2 = useRef(null);
    //i dont seem to need this
    useEffect(() => {
        setNav1(slider1.current);
        setNav2(slider2.current);
    }, []);


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const images = product.image;
    return (
        <div>
            <div className="Dialog">
                <Button className="Dialog__btnAdd" variant="outlined" color="primary" onClick={handleClickOpen}>
                    <ShoppingCartIcon className="Dialog__iconAdd" />
                </Button>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        {product.tittle}
                    </DialogTitle>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <div style={{ padding: "0 30px", background: "#ccc" }}>
                                <Slider className="mainSlider" asNavFor={nav2} ref={slider1}>
                                    {
                                        images.map((image, index) => (
                                            <div key={index}>
                                                <img src={image.url} alt="" className="dialog__image imageview" style={{ maxHeight: "320px" }} />
                                            </div>
                                        ))
                                    }

                                </Slider>
                                <Slider
                                    asNavFor={nav1}
                                    ref={slider2}
                                    slidesToShow={2}
                                    swipeToSlide={true}
                                    focusOnSelect={true}
                                >
                                    {images.map(image => (
                                        <div >
                                            <img src={image.url} alt="" className="dialog__image" />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <FormPay
                                handleClose={handleClose}
                                product={product}
                                onAddToCartClick={onAddToCartClick}
                                onCLickProductView={onProductView}
                                onPayment={onPayment}
                            />
                        </Grid>
                    </Grid>
                    <DialogActions>

                    </DialogActions>
                </Dialog>
            </div>
        </div >
    );
}

export default FormDialog;