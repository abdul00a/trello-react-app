import React, { Component } from 'react';
import './allcard.css';

class AllCards extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { id, name } = this.props.cardObj;
    const cardData = [id, name];
    return (
      <div className="card small" id={id}>
        <li
          onClick={e => {
            e.stopPropagation();
            this.props.modal(cardData);
          }}
        >
          <h6 className="cardValue">
            {name}
            <i
              className="material-icons del"
              onClick={e => {
                e.stopPropagation();
                this.props.onDeleteCard(id);
              }}
            >
              cancel
            </i>
          </h6>
        </li>
      </div>
    );
  }
}

export default AllCards;
