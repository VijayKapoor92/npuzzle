import React, { Component, Fragment } from "react";
import Game from "./components/Game";
import SettingsIcon from "react-icons/lib/fa/cog";
import { PUZZLE_MODE_EASY } from "./utils/constants";
import {getPositionZero, shuffle} from "./utils";

let s = false;

if (localStorage.getItem("game").length) {
  let json = JSON.parse(localStorage.getItem("game"));
  if (json.status)
    s = true;
}

const Puzzles = {
  "easy": [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ],
  "medium": [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15]
  ],
  "hard": []
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: shuffle(Puzzles[PUZZLE_MODE_EASY]),
      steps: 0,
      status: s,
      isConfigOpen: false
    };
  }

  handleStart = () => {
    localStorage.setItem("game", JSON.stringify({"status": true, puzzle: []}));
    this.setState({status: true});
  };

  handleExit = () => {
    localStorage.setItem("game", JSON.stringify({"status": false, puzzle: []}));
    this.setState({status: false});
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

  handleClickSquare = (value, position) => {
    if (value === 0) {
      return;
    }

    let squares = this.state.squares;
    const zero = getPositionZero(squares);

    if ((position.i === zero.i && Math.abs(position.j - zero.j) === 1)
      || (position.j === zero.j && Math.abs(position.i - zero.i) === 1)) {
      squares[position.i][position.j] = 0;
      squares[zero.i][zero.j] = value;

      this.setState(state => ({
        ...state,
        squares,
        steps: state.steps + 1
      }));
    }
  };

  handleOpenConfig = () =>
    this.setState({isConfigOpen: true});

  renderFirstPage = () =>
    <div className="first-page">
      <div className="first-page__title">N-PUZZLE</div>
      <div className="first-page__subtitle">Venha se divertir</div>
      <div className="first-page__action-container">
        <button onClick={this.handleStart}>Jogar</button>
        <button onClick={this.handleOpenConfig}>
          <SettingsIcon/>
        </button>
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
    const {status, squares, steps, isConfigOpen} = this.state;

    //todo: logica para definir quando acabou.
    //todo: logica para salvar o jogo e sair.

    return (
      <Fragment>
        {isConfigOpen && this.renderConfig()}
        {status
          ? <Game
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