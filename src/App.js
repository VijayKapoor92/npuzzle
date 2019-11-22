import React, { Component, Fragment } from "react";
import Game from "./components/Game";
import WinnerContainer from "./components/WinnerContainer";

import SettingsIcon from "react-icons/lib/fa/cog";
import CloseIcon from "react-icons/lib/fa/close";
import TrophyIcon from "react-icons/lib/fa/trophy";

import { PUZZLE_MODE_EASY } from "./utils/constants";
import { Puzzles, Answers } from "./utils/puzzles";
import {getPositionZero, shuffle} from "./utils";
import { Storage } from "./dao";

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
      squares: shuffle(Puzzles[PUZZLE_MODE_EASY]),
      steps: 0,
      status: "stop",
      isConfigOpen: false,
      isWinner: false,
      openWinner: false
    };
  }

  componentDidMount() {
    Storage.connect();
    const puzzle = Storage.get();
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
    const squares = shuffle(Puzzles[PUZZLE_MODE_EASY]);
    const id = Storage.getLastId() + 1;
    console.log(id);
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
      squares: shuffle(Puzzles[PUZZLE_MODE_EASY]),
      steps: 0
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
        if (squares[i][j] === Answers[PUZZLE_MODE_EASY][i][j])
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

  handleOpenConfig = () =>
    this.setState({isConfigOpen: true});

  renderFirstPage = () =>
    <div className="first-page">
      <div className="first-page__title">N-PUZZLE</div>
      <div className="first-page__subtitle">Venha se divertir</div>
      <div className="first-page__action-container">
        {status === "saved" ? (
          <Fragment>
            <button className="btn-start" onClick={() => this.handleContinue(squares)}>Continuar jogo salvo</button>
            <button className="btn-start" onClick={() => this.handleStart(squares)}>Novo jogo</button>
          </Fragment>
        ) : (
          <button className="btn-start" onClick={() => this.handleStart(squares)}>Novo jogo</button>
        )}
        {/*<button className="btn-config" onClick={this.handleOpenConfig}>
          <SettingsIcon/>
        </button>*/}
      </div>
    </div>;

  renderConfig = () =>
    <div>
      <div>Configurações</div>
      <div>
        <label>Nível:</label>
        <select>
          <option>Fácil</option>
          <option>Médio</option>
          <option>Difícil</option>
        </select>
      </div>
    </div>;

  render() {
    const {game, isConfigOpen, winner, openWinner} = this.state;
    const { status, squares, steps } = game;

    //todo: logica para salvar o jogo e sair.
    //todo: criar as views (IntroView e GameView).
    //todo: logica para configuracoes.

    return (
      <Fragment>
        {isConfigOpen && this.renderConfig()}
        <WinnerContainer
          open={openWinner}
          steps={steps}
          onClose={this.handleCloseWinner}
        />
        {status === "start" ? (
          <Game
            game={game}
            winner={winner}
            squares={squares}
            steps={steps}
            onExit={this.handleExit}
            onSaveAndExit={this.handleSaveAndExit}
            onReset={this.handleReset}
            onClickSquare={this.handleClickSquare}
          />
        ) : (
          this.renderFirstPage(squares, status)
        )}
      </Fragment>
    );
  }
}

export default App;