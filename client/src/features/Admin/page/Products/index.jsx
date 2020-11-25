import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableListProducts from 'features/Admin/component/TableListProducts';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

ProductsAdmin.propTypes = {

};

function ProductsAdmin(props) {
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const handleAddProduct = () => {
        setLoading(true)
        setTimeout(() => {
            history.push('/addedit/');
            setLoading(false);
        }, 1000)

    }
    return (
        <div className="ProductAdmin">
            <div className="ProductAdmin__menu">
                <Button
                    onClick={handleAddProduct}
                    loading={loading}
                > Them</Button>
            </div>
            <div className="ProductAdmin__table">
                <TableListProducts />
            </div>
        </div>
    );
}

export default ProductsAdmin;