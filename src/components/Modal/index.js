import React from "react";
import CloseIcon from "react-icons/lib/fa/close";
import TrophyIcon from "react-icons/lib/fa/trophy";
import "./index.css";

const Modal = ({open, scores, title, children, winner, onClose}) => {
  return (
    <div className={`modal ${open ? "show" : ""}`}>
      <div className={`modal-content ${scores ? "scores" : ""} ${!winner && !scores ? "modal-config" : ""}`}>
        <div className="modal-dismiss" onClick={() => onClose()}>
          <CloseIcon/>
        </div>
        <div className="modal-title">{title}</div>
        {winner && (
          <div>
            <TrophyIcon style={{fontSize: 64}}/>
          </div>
        )}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  )
};

export default Modal;