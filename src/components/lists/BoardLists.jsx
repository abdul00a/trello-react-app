import React, { Component } from 'react';
import './boardList.css';
import AllCards from '../cards/AllCards';
import Form from './Form';
import globalVariable from '../../globalVariable';

class BoardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }

  componentDidMount() {
    const url = `https://api.trello.com/1/lists/${this.props.list.id}/cards?key=${globalVariable.apiKey}&token=${globalVariable.token}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          cards: data
        });
      });
  }

  handleAddCard = async name => {
    const url = `https://api.trello.com/1/cards?name=${name}&idList=${this.props.list.id}&pos=bottom&keepFromSource=all&key=${globalVariable.apiKey}&token=${globalVariable.token}`;
    const response = await fetch(url, {
      method: 'POST'
    });
    const data = await response.json();
    this.setState({
      cards: this.state.cards.concat([data])
    });
  };

  handleDeleteCard = async id => {
    const url = `https://api.trello.com/1/cards/${id}?key=${globalVariable.apiKey}&token=${globalVariable.token}`;
    await fetch(url, {
      method: 'DELETE'
    });
    this.setState({
      cards: this.state.cards.filter(card => card.id !== id)
    });
  };

  render() {
    return (
      <div className="lists">
        <div className="card cards">
          <h6 className="header">
            {this.props.list.name}
            <i
              className="material-icons del"
              onClick={() => this.props.onDeleteList(this.props.list.id)}
            >
              cancel
            </i>
          </h6>
          <div className="card allcard">
            <ul>
              {this.state.cards.map(ele => (
                <AllCards
                  cardObj={ele}
                  key={ele.id}
                  onDeleteCard={this.handleDeleteCard}
                  modal={this.props.openModal}
                />
              ))}
            </ul>
          </div>
          <Form name='card' onAdd={this.handleAddCard} />
        </div>
      </div>
    );
  }
}

export default BoardList;
