import React from 'react';
import './allcard.css';

function AllCards(props) {
  return (
    <div className="card small" id={props.cardObj.id}>
      <h6 className="cardValue">
        {props.cardObj.name}
        <i
          className="material-icons del"
          onClick={() => props.onDeleteCard(props.cardObj.id)}
        >
          cancel
        </i>
      </h6>
    </div>
  );
}

export default AllCards;
