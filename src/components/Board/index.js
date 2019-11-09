import React from "react";
import Square from "../Square";
 
class Board extends React.Component {
  render() {
    const {squares, onClick} = this.props;
    return (
      <div>
        {squares.map((square, index) => (
          <div key={index} className="board-row">
            {square.map((s, i) => (
              <Square
                key={i}
                value={squares[index][i]}
                position={{i: index, j: i}}
                onClick={onClick}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Board;