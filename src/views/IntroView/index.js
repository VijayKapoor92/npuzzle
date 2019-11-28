import React, { Fragment } from "react";
import { FaTrophy } from "react-icons/lib/fa";

const IntroView = ({squares, status, onContinue, onStart, onOpenScores}) =>
  status !== "start" && (
    <div className="first-page">
      <div className="first-page__title">
        N-PUZZLE
        <button onClick={() => onOpenScores()} style={{fontSize: 24, borderRadius: '50%', padding: 0, width: 45, height: 45, position: "absolute", right: -35, top: -35}}>
          <FaTrophy/>
        </button>
      </div>
      <div className="first-page__subtitle">Venha se divertir</div>
      <div className="first-page__action-container">
        {status === "saved" ? (
          <Fragment>
            <button className="btn-start" onClick={() => onContinue(squares)}>Continuar jogo salvo</button>
            <button className="btn-start" onClick={() => onStart(squares)}>Novo jogo</button>
          </Fragment>
        ) : (
          <button className="btn-start" onClick={() => onStart(squares)}>Novo jogo</button>
        )}
      </div>
    </div>
  );

export default IntroView;