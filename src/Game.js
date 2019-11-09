import React from "react";
import "./index.css";

import Board from "./components/Board";

function shuffle(squares) {
    const m = squares.length;
    let t;
    for (let i = 0; i < m; i++) {
      let n = squares[i].length, k = Math.floor(Math.random() * i), l;
      for (let j = 0; j < n; j++) {
        l = Math.floor(Math.random() * j);
        t = squares[i][j];
        squares[i][j] = squares[k][l];
        squares[k][l] = t;
      }
    }
    return squares;
}

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;   
    }

    return array;
}

class Game extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        squares: shuffle([0,1,2,3,4,5,6,7,8]),
        stepNumber: 0
      };
  }

  handleClickSquare = (e, value) => {
      if (value === 0) {
        e.preventDefault();
        return false;
      }

      let squares = this.state.squares;

      /*for (let i = 0; i < squares.length/3; i++) {
          for (let j =  0; j < squares.length/3; j++) {
              console.log(`${i} >>>> ${j}`)
          }
      }*/

      //0: => 1 ou 3
      //1: => 0 ou 2 ou 4
      //2

      squares.map((a, i) => {
          if (a === 0) {
            squares[i] = value;
          }

          if (a === value) {
            squares[i] = 0;
          }
      });

      this.setState({squares, stepNumber: this.state.stepNumber++});
  }

  render() {
      const {squares} = this.state;

      return (
          <div className="game">
            <div className="game-board">
                <Board 
                    squares={squares} 
                    onClick={this.handleClickSquare}
                />
            </div>
          </div>
      );
  }
}

export default Game;