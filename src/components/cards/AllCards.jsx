import React from 'react';
import './allcard.css';

function AllCards(props) {
  const { id, name } = props.cardObj;
  return (
    <div className="card small">
      <li onClick={() => props.modal(id,name)}>
        <h6 className="cardValue">
          {name}
          <i
            className="material-icons del"
            onClick={e => {
              e.stopPropagation();
              props.onDeleteCard(id);
            }}
          >
            cancel
          </i>
        </h6>
      </li>
    </div>
  );
}

export default AllCards;
