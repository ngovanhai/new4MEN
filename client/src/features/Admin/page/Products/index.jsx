import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TableListProducts from 'features/Admin/component/TableListProducts';
import { useHistory } from 'react-router-dom';
import { Button, Input, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import Search from 'antd/lib/input/Search';
import productApi from 'api/productsAPI';

ProductsAdmin.propTypes = {

};

function ProductsAdmin(props) {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [produtcs, setProducts] = useState([])
    const [totalProducts, setTotalProducts] = useState(0);
    const handleAddProduct = () => {
        setLoading(true)
        setTimeout(() => {
            history.push('/addedit/');
            setLoading(false);
        }, 1000)

    }
    let data = {
        sort: sort,
        page: page + 1,
        rowsPerPage: rowsPerPage,
        category: category,

    }
    const fetchData = async () => {
        const res = await productApi.getproductAdmin(data)
        setProducts(res.products)
    }
    useEffect(() => {
        fetchData()
    }, [category])
    useEffect(() => {
        fetchData()
    }, [sort])
    useEffect(() => {
        fetchData()
    }, [page])
    useEffect(() => {
        fetchData()
    }, [rowsPerPage])
    useEffect(() => {
        console.log("search", search);
    }, [search])

    useEffect(() => {
        const fetchDataDefault = async () => {
            const res = await productApi.getproductAdmin(data)
            setProducts(res.products)
            setTotalProducts(res.countFullProducts)
        }
        fetchDataDefault()
    }, [])
    const hanhdle = async (value) => {
        const res = await productApi.search(value)
        setProducts(res)
        setTotalProducts(res.length)
    }
    return (
        <div className="ProductAdmin">
            <div className="ProductAdmin__menu" style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex" }}>
                    <Button
                        onClick={handleAddProduct}
                        loading={loading}
                    > Th??m s???n ph???m m???i</Button>
                    <Select
                        style={{ width: 200 }}
                        placeholder="Danh m???c s???n ph???m  "
                        onChange={(value) => {
                            setCategory(value);
                        }}
                    >
                        <Option value="quan-nam">Qu???n nam</Option>
                        <Option value="giay-dep">Gi??y d??p</Option>
                        <Option value="phu-kien">Ph??? ki???n</Option>
                    </Select>
                    <Select
                        style={{ width: 200 }}
                        placeholder="S???p x???p theo gi?? s???n ph???m"
                        onChange={(value) => {
                            setSort(value);

                        }}
                    >
                        <Option value="gia">Gi?? t??ng d???n</Option>
                        <Option value="-gia">Gi?? gi???m d???n</Option>
                    </Select>
                    <Input.Search onSearch={hanhdle} />
                </div>
            </div>
            <div className="ProductAdmin__table">
                <TableListProducts
                    page={page}
                    totalProducts={totalProducts}
                    rowsPerPage={rowsPerPage}
                    setPage={setPage}
                    setRowsPerPage={setRowsPerPage}
                    products={produtcs}
                    setProducts={setProducts}
                    fetchData={fetchData}
                />
            </div>
        </div>
    );
}

export default ProductsAdmin;