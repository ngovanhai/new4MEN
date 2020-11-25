import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

token.propTypes = {

};

function token(props) {
    const tokent = useSelector(state => state.auth)
    return {
        tokent
    };
}

export default token;
