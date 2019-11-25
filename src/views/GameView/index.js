import React from "react";
import Game from "../../components/Game";

const GameView = ({status, winner, game, squares, steps, onExit, onSaveAndExit, onReset, onClickSquare}) =>
  status === "start" && (
    <Game
      game={game}
      winner={winner}
      squares={squares}
      steps={steps}
      onExit={onExit}
      onSaveAndExit={onSaveAndExit}
      onReset={onReset}
      onClickSquare={onClickSquare}
    />
  );

export default GameView;