import React from "react";

function Square(props) {
    const {value, onClick} = props;
    return (
        <button className="square" onClick={e => onClick(e, value)}>
            {value !== 0 && value}
        </button>
    );
}

export default Square;