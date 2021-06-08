import React, { useEffect, useState } from "react";

import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Container, TextField, TextareaAutosize, MenuItem, makeStyles, Grid } from "@material-ui/core";

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
import { Input, Button, Form, Select, Card } from "antd";
const { Option } = Select;
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
    const { productId } = useParams();
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const [loadingd, setLoadingd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingAdd, setLoadingAdd] = useState(false)
    const isAddmode = !productId;
    const [urlImage, setUrlImage] = useState([]);
    const layout = {
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 18
        }
    };
    const tailLayout = {
        wrapperCol: {
            offset: 6,
            span: 18
        }
    };


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
    // const fetchProductsList = async () => {
    //     try {
    //         const response = await productApi.getAll();
    //         dispatch(AddToProduct(response));

    //     } catch (err) {
    //         console.log('failed to fetch product list :')
    //     }
    // }
    const onSubmit = values => {
        if (urlImage.length === 0) {
            alert("xin mời chọn ảnh")
            return
        }
        let data = { ...values, image: urlImage, "product_id": Math.trunc(Math.random() * 1000) };
        const addProduct = async () => {
            setLoadingAdd(true)
            await productApi.create(data)
            setLoadingAdd(false);
            alert("Thêm sản phẩm thành công")
        }
        addProduct();
        //  fetchProductsList();
    }
    const onUpdate = values => {
        if (urlImage.length === 0) {
            alert("xin mời chọn ảnh")
            return
        }
        const data = { ...values, image: urlImage };
        const updateProduct = async () => {
            setLoadingAdd(true)
            await productApi.update(productId, data)
            setLoadingAdd(false)
            alert("sủa sản phẩm thành công")
        }
        updateProduct()
        // fetchProductsList()
    }
    const handleRemove = async (id) => {
        await userApi.deleteImage({ public_id: id })
        const filterImage = urlImage.filter(image => image.public_id !== id)
        setUrlImage(filterImage)
    }
    useEffect(() => {
        const getProduct = async () => {
            const res = await productApi.get(productId)
            setUrlImage(res.image)
            setData(res);
            setLoadingd(false);
        }
        getProduct()
    }, [])
    const onFinish = (values) => {
        if (isAddmode) {
            onSubmit(values)
        } else {
            onUpdate(values)
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Card className="AddEditProduct">
            {((isAddmode == false && Object.keys(data).length !== 0) || (isAddmode == true)) && (
                <Container >
                    <div className="AddEditProduct__content">
                        <h1>{isAddmode ? "Thêm sản phẩm" : data.tittle}</h1>
                    </div>
                    <Grid container spacing={0}>
                        <Grid item xs={3} >
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
                        <Grid item xs={9} style={{}}>
                            <Form
                                {...layout}
                                name="basic"
                                initialValues={{
                                    tittle: isAddmode ? "" : data.tittle,
                                    mota: isAddmode ? "" : data.mota,
                                    gia: isAddmode ? "" : data.gia,
                                    soluong: isAddmode ? "" : data.soluong,
                                    sale: isAddmode ? "" : data.sale,
                                    phanloai: isAddmode ? "" : data.phanloai,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    label="Tên sản phẩm"
                                    name="tittle"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập tên sản phẩm!"
                                        }
                                    ]}
                                >
                                    <Input
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Phân loại"
                                    name="phanloai"
                                >
                                    <Select >
                                        <Option value="quan-nam">Quần nam</Option>
                                        <Option value="phu-kien">Phụ kiện</Option>
                                        <Option value="giay-dep">Giày dép</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Mô tả sản phẩm"
                                    name="mota"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập mô tả sản phẩm !"
                                        }
                                    ]}
                                >
                                    <Input.TextArea
                                        rows={4}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Giá sản phẩm"
                                    name="gia"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập Giá sản phẩm!"
                                        }
                                    ]}
                                >
                                    <Input type="number">

                                    </Input>
                                </Form.Item>
                                <Form.Item
                                    label="Số lượng"
                                    name="soluong"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập số lượng!"
                                        }
                                    ]}
                                >
                                    <Input type="number" />
                                </Form.Item>
                                <Form.Item
                                    label="Khuyến mãi"
                                    name="sale"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập số khuyến mãi !"
                                        }
                                    ]}
                                >
                                    <Input type="number" />
                                </Form.Item>

                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit" loading={loadingAdd}>
                                        {isAddmode ? "Thêm sản phẩm" : "Sửa sản phẩm"}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Grid>
                    </Grid>
                </Container>
            )}
        </Card >
    );
}

export default AddEditProducts;
