import React from "react";
import CloseIcon from "react-icons/lib/fa/close";
import TrophyIcon from "react-icons/lib/fa/trophy";

const WinnerContainer = ({open, steps, onClose}) =>
  <div className={`winner-backdrop ${open ? 'show' : ''}`}>
    <div className="winner-container">
      <div className="winner-container__dismiss" onClick={() => onClose()}>
        <CloseIcon/>
      </div>
      <div className="winner-container__title">Parabéns!</div>
      <div>
        <TrophyIcon style={{fontSize: 64}}/>
      </div>
      <div className="winner-container__body">
        <div style={{fontSize: 24, textAlign: "center", marginTop: 20}}>{steps}</div>
      </div>
    </div>
  </div>;

export default WinnerContainer;