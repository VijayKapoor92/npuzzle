import React from "react";
import Modal from "../Modal";
import {PUZZLE_MODE_3X3, PUZZLE_MODE_4X4, PUZZLE_MODE_5X5} from "../../utils/constants";

const ModalConfig = ({open, mode, onChange, onClose}) =>
    <Modal
      open={open}
      title="Configurações"
      onClose={onClose}
    >
      <div style={{display: "flex", alignItems: "center"}}>
        <label style={{marginRight: 10}}>Nível:</label>
        <select value={mode} className="select-mode" onChange={onChange}>
          <option value={PUZZLE_MODE_3X3}>{PUZZLE_MODE_3X3}</option>
          <option value={PUZZLE_MODE_4X4}>{PUZZLE_MODE_4X4}</option>
          <option value={PUZZLE_MODE_5X5}>{PUZZLE_MODE_5X5}</option>
        </select>
      </div>
    </Modal>;

export default ModalConfig;