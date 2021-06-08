import React, { useEffect, useState } from 'react';
import { Input, Button, Form, Select, Card } from "antd";
import userApi from 'api/useAPI';
import { useParams } from 'react-router-dom';
import { Container, makeStyles } from '@material-ui/core';
const { Option } = Select;
const layout = {
    labelCol: {
        span: 2
    },
    wrapperCol: {
        span: 22
    }
};
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 18
    }
};
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(4),
        minWidth: 1500,
    },
}));



function AddEditUser(props) {
    const classes = useStyles()
    const userId = useParams();
    const [data, setData] = useState([]);
    const [loadingAdd, setLoadingAdd] = useState(false)
    const isAddmode = !userId;
    console.log("userId", userId);
    useEffect(() => {
        const getUser = async () => {
            const res = await userApi.getUser()
            setData(res);
        }
        getUser()
    }, [])
    const onSubmit = () => {
        console.log("update");
    }
    const onUpdate = () => {
        console.log("update");
    }
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
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Form style={{ width: "90%", padding: "50px" }}
                {...layout}
                name="basic"
                // initialValues={{
                //     tittle: isAddmode ? "" : data.tittle,
                //     mota: isAddmode ? "" : data.mota,
                //     gia: isAddmode ? "" : data.gia,
                //     soluong: isAddmode ? "" : data.soluong,
                //     sale: isAddmode ? "" : data.sale,
                //     phanloai: isAddmode ? "" : data.phanloai,
                // }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="User name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập user name!"
                        }
                    ]}
                >
                    <Input
                    />
                </Form.Item>


                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập email !"
                        }
                    ]}
                >
                    <Input type="email">

                    </Input>
                </Form.Item>

                <Form.Item
                    label="Quyền"
                    name="role"
                >
                    <Select >
                        <Option value="0">Admin</Option>
                        <Option value="1">Super Admin</Option>
                    </Select>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={loadingAdd}>
                        {isAddmode ? "Thêm tài khoản" : "Sửa tài khoản"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddEditUser;