import React from 'react';
import "./Loading.scss"
function Loading(props) {
    return (
        <div className="loading" style={{ width: "100%", height: "500px", position: "relative" }}>
            <span></span>
        </div>
    );
}

export default Loading;