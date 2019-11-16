import React from "react";
import "../../index.css";

import Board from "../Board";
class Game extends React.Component {
  render() {
      const {onExit, onSaveAndExit, onReset, onClickSquare, squares, steps} = this.props;

      return (
        <div className="game-window">
          <div style={{textAlign: "center", marginBottom: 10, fontSize: 18}}>
            <div style={{marginBottom: 5}}>Passos</div>
            <div>{steps}</div>
          </div>
          <div className="game">
            <div className="game-board">
              <Board
                squares={squares}
                onClick={onClickSquare}
              />
            </div>
          </div>
          <div style={{marginTop: 10}}>
            <button onClick={() => onReset()}>Reiniciar</button>
            {/*<button onClick={() => onSaveAndExit(squares)}>Salvar e Sair</button>*/}
            <button onClick={() => onExit()}>Sair</button>
          </div>
        </div>
      );
  }
}

export default Game;