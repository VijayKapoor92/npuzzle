import React from "react";
import Modal from "../Modal";

const ModalWinner = ({open, steps, winner, onClose}) =>
  <Modal
    open={open}
    winner={winner}
    title="Parabéns!"
    onClose={onClose}
  >
    <div style={{fontSize: 24, textAlign: "center", marginTop: 20}}>{steps}</div>
  </Modal>;

export default ModalWinner;