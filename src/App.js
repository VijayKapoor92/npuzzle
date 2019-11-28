import React, { Component, Fragment } from "react";
import GameView from "./views/GameView";
import ModalWinner from "./components/ModalWinner";
import IntroView from "./views/IntroView";
import ModalConfig from "./components/ModalConfig";
import ModalScores from "./components/ModalScores";

import SettingsIcon from "react-icons/lib/fa/cog";

import { PUZZLE_MODE_3X3 } from "./utils/constants";
import { Puzzles, Answers } from "./utils/puzzles";
import {getPositionZero, shuffle} from "./utils";
import {Storage, StorageScores} from "./dao";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        id: 0,
        squares: [],
        steps: 0,
        status: "stop"
      },
      scores: [],
      openScores: false,
      status: "stop",
      isWinner: false,
      openWinner: false
    };
  }

  componentDidMount() {
    Storage.connect();
    const puzzle = Storage.get();
    const scores = StorageScores.get();

    if (scores.length)
      this.setState({scores});

    if (puzzle.length && puzzle.filter(p => p.status === "saved").length)
      this.setState(state => ({
        ...state,
        game: {
          squares: puzzle.filter(p => p.status === "saved").map(p => p.puzzle)[0],
          status: puzzle.filter(p => p.status === "saved").map(p => p.status)[0],
          steps: puzzle.filter(p => p.status === "saved").map(p => p.steps)[0],
          id: puzzle.filter(p => p.status === "saved").map(p => p.id)[0]
        }
      }));
  }

  handleStart = () => {
    const squares = shuffle(Puzzles[PUZZLE_MODE_3X3]);
    const id = Storage.getLastId() + 1;

    Storage.insert({id, status: "start", puzzle: squares, steps: 0});
    this.setState({game: {status: "start", squares: squares, steps: 0, id}});
  };

  handleExit = () => {
    Storage.delete(Storage.getLastId());
    this.setState({
      game: {
        status: "stop",
        steps: 0,
        puzzle: []
      },
      winner: false,
    });
  };

  handleSaveAndExit = (game) => {
    Storage.update({id: game.id, status: "saved", puzzle: game.squares, steps: game.steps});
    this.setState({game: {status: "saved", steps: game.steps, squares: game.squares,}});
  };

  handleReset = () => {
    this.setState(state => ({
      ...state,
      game: {
        ...state.game,
        squares: shuffle(Puzzles[PUZZLE_MODE_3X3]),
        steps: 0
      }
    }));
  };

  validateColumnAndRow = (position, zero) =>
    (position.i === zero.i && Math.abs(position.j - zero.j) === 1)
    || (position.j === zero.j && Math.abs(position.i - zero.i) === 1);

  validateWinner = squares => {
    let
      counter = 0,
      winner = false;

    const le = (squares.length * (squares[squares.length - 1].length));

    for(let i = 0;i < squares.length;i++)
      for(let j = 0;j < squares[i].length; j++)
        if (squares[i][j] === Answers[PUZZLE_MODE_3X3][i][j])
          counter++;

    if (counter < le)
      counter = 0;
    if (counter === le)
      winner = true;

    return winner;
  };

  handleClickSquare = (value, position) => {
    let squares = this.state.game.squares;
    const zero = getPositionZero(squares);

    if (value === 0 || !(this.validateColumnAndRow(position, zero))) {
      return;
    }
    squares[position.i][position.j] = 0;
    squares[zero.i][zero.j] = value;

    const winner = this.validateWinner(squares);

    if (winner)
      StorageScores.insert({score: this.state.game.steps + 1});

    this.setState(state => ({
      ...state,
      game: {
        ...state.game,
        squares,
        steps: state.game.steps + 1,
      },
      winner,
      openWinner: winner
    }));
  };

  handleContinue = () =>
    this.setState(state => ({
      ...state,
      game: {
        ...state.game,
        status: "start"
      }
    }));

  handleCloseWinner = () =>
    this.setState({openWinner: false});

  handleOpenScores = () =>
    this.setState({openScores: true});

  handleCloseScores = () =>
    this.setState({openScores: false});

  render() {
    const {game, winner, openWinner, scores, openScores} = this.state;
    const { status, squares, steps } = game;

    return (
      <Fragment>
        <ModalScores
          open={openScores}
          scores={scores}
          onClose={this.handleCloseScores}
        />
        <ModalWinner
          open={openWinner}
          winner={winner}
          steps={steps}
          onClose={this.handleCloseWinner}
        />
        <IntroView
          squares={squares}
          status={status}
          onStart={this.handleStart}
          onContinue={this.handleContinue}
          onOpenScores={this.handleOpenScores}
        />
        <GameView
          status={status}
          winner={winner}
          game={game}
          squares={squares}
          steps={steps}
          onExit={this.handleExit}
          onSaveAndExit={this.handleSaveAndExit}
          onReset={this.handleReset}
          onClickSquare={this.handleClickSquare}
        />
      </Fragment>
    );
  }
}

export default App;