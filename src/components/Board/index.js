import React from "react";
import Square from "../Square";

const Board = ({squares, winner, onClick}) => {
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
};

export default Board;