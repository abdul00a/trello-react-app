import React from 'react';
import './allcard.css';

function AllCards(props) {
  return (
    <div>
      <div className="card small">
        <h6>{props.cardObj.name}</h6>
      </div>
    </div>
  );
}

export default AllCards;
