import React from "react";
import CloseIcon from "react-icons/lib/fa/close";
import TrophyIcon from "react-icons/lib/fa/trophy";
import "./index.css";

const Modal = ({open, type, title, children, onClose}) => {
  const className = `modal-content ${type === "scores" ? "scores" : ""} ${type !== "winner" && type !== "scores" ? "modal-config" : ""}`;
  return (
    <div className={`modal ${open ? "show" : ""}`}>
      <div className={className}>
        <div className="modal-dismiss" onClick={() => onClose()}>
          <CloseIcon/>
        </div>
        <div className="modal-title">{title}</div>
        {type === "winner" && (
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