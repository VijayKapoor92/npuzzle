import React, {Fragment} from "react";
import Modal from "../Modal";

const ModalScores = ({open, scores, onClose}) =>
    <Modal
      open={open}
      title="Highscores"
      onClose={onClose}
      scores
    >
      {scores.length > 0 ? (
        <ul style={{width: 200, listStyle: "none", padding: 0, margin: 0, fontSize: 16, maxHeight: 200, overflowY: "auto"}}>
          {scores.map((s, i) => (
            <Fragment key={i}>
              <li style={{paddingLeft: 8, height: 20, display: "flex", alignItems: "center"}}>
                <span style={{marginRight: 15}}>{i+1}.</span> Score: {s.score}
              </li>
              <hr style={{color: "rgba(0, 0, 0, .3)"}}/>
            </Fragment>
          ))}
        </ul>
      ) : (
        "Não possui scores ainda"
      )}
    </Modal>;

export default ModalScores;