import React, { Fragment } from "react";
import "../../index.css";

import Board from "../Board";

const Game = ({onExit, winner, onSaveAndExit, onReset, onClickSquare, squares, steps, game}) =>
    <Fragment>
      <div className="game-window">
        <div style={{textAlign: "center", marginBottom: 10, fontSize: 18}}>
          <div style={{marginBottom: 5}}>Passos</div>
          <div>{steps}</div>
        </div>
        <div className="game">
          <div className="game-board">
            <Board
              winner={winner}
              squares={squares}
              onClick={onClickSquare}
            />
          </div>
        </div>
        <div style={{marginTop: 10}}>
          {!winner && (
            <button onClick={() => onReset()}>Reiniciar</button>
          )}
          <button onClick={() => onSaveAndExit(game)}>Salvar e Sair</button>
          <button onClick={() => onExit()}>Sair</button>
        </div>
      </div>
    </Fragment>;

export default Game;