import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import './previewImage.scss';
PreviewImage.propTypes = {

};

function PreviewImage(props) {
    const { url, id, onClickRemove, loading } = props
    console.log(url, id);
    const remove = () => {
        onClickRemove(id)
    }
    return (

        <Grid item xs={6}> <span><HighlightOffIcon className="Preview__delete" onClick={remove} /></span>
            <img src={url}
                className="Preview__img"
                alt="" />
        </Grid>
    );
}

export default PreviewImage;