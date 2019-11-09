import React from "react";

function Square(props) {
    const {value, position, onClick} = props;
    return (
        <button className="square" onClick={() => onClick(value, position)}>
            {value !== 0 && value}
        </button>
    );
}

export default Square;