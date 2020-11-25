import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

TestOder.propTypes = {

};

function TestOder(props) {
    const { oderId } = useParams();
    console.log(oderId);
    return (
        <div>
            test oder
        </div>
    );
}

export default TestOder;