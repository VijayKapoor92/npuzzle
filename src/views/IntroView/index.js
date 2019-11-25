import React, { Fragment } from "react";

const IntroView = ({squares, status, onContinue, onStart}) =>
  status !== "start" && (
    <div className="first-page">
      <div className="first-page__title">N-PUZZLE</div>
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