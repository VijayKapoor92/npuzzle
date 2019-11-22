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

  handleStart = () => {
    localStorage.setItem("game", JSON.stringify({"status": true, puzzle: []}));
    this.setState({status: true});
  };

  handleExit = () => {
    localStorage.setItem("game", JSON.stringify({"status": false, puzzle: []}));
    this.setState({status: false, winner: false, steps: 0});
  };

  handleSaveAndExit = puzzle => {
    localStorage.setItem("game", JSON.stringify({"status": false, puzzle}));
    this.setState({status: false});
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
    let squares = this.state.squares;
    const zero = getPositionZero(squares);

    if (value === 0 || !(this.validateColumnAndRow(position, zero))) {
      return;
    }
    squares[position.i][position.j] = 0;
    squares[zero.i][zero.j] = value;

    const winner = this.validateWinner(squares);

    this.setState(state => ({
      ...state,
      squares,
      steps: state.steps + 1,
      winner,
      openWinner: winner
    }));
  };

  handleCloseWinner = () =>
    this.setState({openWinner: false});

  handleOpenConfig = () =>
    this.setState({isConfigOpen: true});

  renderFirstPage = () =>
    <div className="first-page">
      <div className="first-page__title">N-PUZZLE</div>
      <div className="first-page__subtitle">Venha se divertir</div>
      <div className="first-page__action-container">
        <button className="btn-start" onClick={this.handleStart}>Jogar</button>
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
    const {status, squares, steps, isConfigOpen, winner, openWinner} = this.state;

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
        {status
          ? <Game
              winner={winner}
              squares={squares}
              steps={steps}
              onExit={this.handleExit}
              onSaveAndExit={this.handleSaveAndExit}
              onReset={this.handleReset}
              onClickSquare={this.handleClickSquare}
            />
          : this.renderFirstPage()
        }
      </Fragment>
    );
  }
}

export default App;