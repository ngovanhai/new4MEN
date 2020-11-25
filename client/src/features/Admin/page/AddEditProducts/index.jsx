import React, { useEffect, useState } from "react";

import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Container, Select, TextField, TextareaAutosize, MenuItem, makeStyles, Button, Grid } from "@material-ui/core";

import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { AddToProduct } from "features/Products/productSlice";
import productApi from "api/productsAPI";
import { Roller } from "react-awesome-spinners";

import './AddEditProducts.scss';
import userApi from "api/useAPI";
import axios from "axios";
import PreviewImage from "features/Admin/component/previewImage";
import { AddToItem } from "features/Admin/itemSlice";

AddEditProducts.propTypes = {

};
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(4),
        minWidth: 800,
    },
}));

const options = [
    { value: "quan-nam", label: "Quần nam" },
    { value: "phu-kien", label: "Phụ kiện" },
    { value: "giay-dep", label: "Giày dép" }
];

function AddEditProducts(props) {
    const classes = useStyles()
    const ValidationSchema = yup.object().shape({
        tittle: yup.string().required('this field is required'),
        mota: yup.string().required('this field is required'),
        gia: yup.string().required('this field is required'),
        soluong: yup.string().required('this field is required')
    });

    const { productId } = useParams();
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [loadingAdd, setLoadingAdd] = useState(false)
    const isAddmode = !productId;
    const { handleSubmit, register, control, errors } = useForm({
        validationSchema: ValidationSchema
    });

    const [urlImage, setUrlImage] = useState([])
    const [mota, setMota] = useState()
    const handleTextArea = (e) => {
        const { value } = e.target;
        setMota(value)
    }
    const product = useSelector(state => state.item)



    const handlePreview = async (e) => {
        e.preventDefault()
        try {
            const files = e.target.files;
            let formData = new FormData()
            if (!files) return alert("! File not exits")
            if (files.length > 1) {
                for (let i = 0; i < files.length; i++) {
                    if (files[i].size > 4096 * 4096) return alert("File too large!")
                    if (files[i].type !== "image/jpeg" && files[i].type !== "image/png")
                        return alert("file fomat is incorrect")
                    formData.append(`images${i}`, files[i])
                }
            }
            if (files.length === 1) {
                if (files[0].size > 1024 * 1024) return alert("File too large!")
                if (files[0].type !== 'image/jpeg' && files[0].type !== 'image/png')
                    return alert("file fomat is incorrect")
                formData.append(`images0`, files[0])
            }
            try {
                setLoading(true)
                const res = await axios.post("http://localhost:5000/api/upload", formData, {
                    headers: { 'content-type': 'multipart/form-data' }
                })
                setUrlImage(res.data)
                setLoading(false)

            } catch (err) {
                alert(err.message)
            }
        } catch (err) {
            alert(err.message)
        }
    }
    const fetchProductsList = async () => {
        try {
            const response = await productApi.getAll();
            dispatch(AddToProduct(response));

        } catch (err) {
            console.log('failed to fetch product list :')
        }
    }
    const onSubmit = values => {
        if (urlImage.length === 0) {
            alert("xin mời chọn ảnh")
            return
        }
        let data = { ...values, image: urlImage, mota: mota, "product_id": Math.trunc(Math.random() * 1000) };
        const addProduct = async () => {
            setLoadingAdd(true)
            await productApi.create(data)
            setLoadingAdd(false)
            alert("Thêm sản phẩm thành công")
        }
        addProduct();

        fetchProductsList();

    }
    const onUpdate = values => {
        if (urlImage.length === 0) {
            alert("xin mời chọn ảnh")
            return
        }
        const data = { ...values, image: urlImage, mota: mota };
        const updateProduct = async () => {
            setLoadingAdd(true)
            await productApi.update(productId, data)
            setLoadingAdd(false)
            alert("sủa sản phẩm thành công")
        }
        updateProduct()
        fetchProductsList()
    }
    const handleRemove = async (id) => {
        await userApi.deleteImage({ public_id: id })
        const filterImage = urlImage.filter(image => image.public_id !== id)
        setUrlImage(filterImage)
    }
    useEffect(() => {
        const getProduct = async () => {
            const res = await productApi.get(productId)
            setData(res)
        }
        getProduct()
    }, [])
    console.log(data.phanloi);
    return (
        <div className="AddEditProduct">
            <Container fixed>
                <div className="AddEditProduct__content">
                    <h1>{isAddmode ? "Thêm sản phẩm" : data.tittle}</h1>
                </div>
                <Grid container spacing={0}>
                    <Grid item xs={5} >
                        <div className="AddEditProduct__upload">
                            <input type="file" className="AddEditProduct__input" multiple onChange={handlePreview}></input>
                            <Grid container xs={2} className="AddEditProduct__show">
                                {loading ? <Roller /> : (
                                    urlImage.map(image => (
                                        <PreviewImage
                                            loading={loading}
                                            url={image.url}
                                            id={image.public_id}
                                            onClickRemove={handleRemove}
                                        />)
                                    )
                                )}
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={5} >
                        <form className={classes.formControl} onSubmit={handleSubmit(isAddmode ? onSubmit : onUpdate)}>
                            <TextField
                                name="tittle"
                                inputRef={register({
                                    required: "This input is required.",
                                })}
                                label="Tên sản phẩm"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                error={errors.tittle ? true : false}
                            />
                            <TextareaAutosize
                                className="AddEditProduct__description"
                                placeholder="mô tả sản phẩm"
                                name="mota"
                                multiline
                                defaultValue={isAddmode ? "" : data.mota}
                                rows={10}
                                rowsMax={5}
                                inputRef={register}
                                onChange={handleTextArea}
                                error={errors.mota ? true : false}
                            />
                            <Controller
                                as={
                                    <Select>
                                        <MenuItem value="DEFAULT">Please select a category</MenuItem>
                                        {options.map(category => (
                                            <MenuItem value={category.value}>{category.label}</MenuItem>
                                        ))}
                                    </Select>
                                }
                                name="phanloai"
                                className="AddEditProduct__category"
                                control={control}
                            />
                            <TextField
                                name="gia"
                                inputRef={register({
                                    required: "This input is required.",
                                })}
                                label="Gía sản phẩm"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                type="number"
                                error={errors.gia ? true : false}
                            />
                            <TextField
                                name="soluong"
                                inputRef={register({
                                    required: "This input is required.",
                                })}
                                label="Số lượng nhập"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                type="number"
                                error={errors.amount ? true : false}
                            />
                            <TextField
                                name="sale"
                                inputRef={register({
                                    required: "This input is required.",
                                })}
                                label="Khuyến mại"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                type="number"
                                error={errors.sale ? true : false}
                            />
                            {/* <Button type="submit">{loading ? <Roller /> : "Thêm sản phẩm"} </Button> */}
                            <Button type="submit">{isAddmode ? (loadingAdd ? <Roller /> : "Thêm sản phẩm") : (loadingAdd ? <Roller /> : 'Sửa sản phẩm')} </Button>
                            <div>{loading ? "true" : "false"}</div>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </div >
    );
}

export default AddEditProducts;
