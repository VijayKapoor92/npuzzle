import React from "react";
import Square from "../Square";
 
class Board extends React.Component {
  render() {
    const {squares, winner, onClick} = this.props;
    let fn_click = onClick;
    if (winner)
      fn_click = ()=>false;

    return (
      <div>
        {squares.map((square, index) => (
          <div key={index} className="board-row">
            {square.map((s, i) => (
              <Square
                key={i}
                value={squares[index][i]}
                position={{i: index, j: i}}
                onClick={fn_click}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Board;