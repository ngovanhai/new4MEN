import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import ItemCard from '../ItemCard';
import { DeleteProductToCart } from 'features/Cart/cartSlice';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Cookies from 'universal-cookie';


ListCart.propTypes = {

};
const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

function ListCart(props) {
    const itemCart = useSelector(state => state.cart);
    const [visiable, setVisiable] = useState(false);
    const dispatch = useDispatch();
    const handleMenuClick = (e) => {
        if (e.key === "3") {
            setVisiable(true);
        }
    };
    const handleVisibleChange = (flag) => {
        setVisiable(flag);
    };

    const handleDeleteItemCart = (item) => {
        const deleteItemCartId = item.idCart;
        const action = DeleteProductToCart(deleteItemCartId);
        dispatch(action);
    }



    return (
        <Dropdown
            overlay={

                <ItemCard
                    item={itemCart}
                    OnClickDeleteItemCart={handleDeleteItemCart}
                ></ItemCard>
            }
            onVisibleChange={(e) => handleVisibleChange(e)}
            visible={visiable}
        >
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <IconButton aria-label="cart">
                    <StyledBadge badgeContent={itemCart.length} color="secondary">
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton>
            </a>
        </Dropdown>
    );
}

export default ListCart;