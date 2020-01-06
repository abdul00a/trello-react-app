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
    // console.log(props);
  }

  componentDidMount() {
    const url = `https://api.trello.com/1/lists/${this.props.data.id}/cards?key=${globalVariable.apiKey}&token=${globalVariable.token}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          cards: data
        });
        // console.log(data);
      });
  }

  handleAddCard = async name => {
    const url = `https://api.trello.com/1/cards?name=${name}&idList=${this.props.data.id}&pos=bottom&keepFromSource=all&key=${globalVariable.apiKey}&token=${globalVariable.token}`;
    const response = await fetch(url, {
      method: 'POST'
    });
    const data = await response.json();
    // console.log(data);
    this.setState({
      cards: this.state.cards.concat([data])
    });
  };

  handleDeleteCard = async id => {
    // console.log(id);
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
      <div className="lists" id={this.props.data.id}>
        <div className="card cards">
          <h6 className="header">
            {this.props.data.name}
            <i
              className="material-icons del"
              onClick={() => this.props.onDeleteList(this.props.data.id)}
            >
              cancel
            </i>
          </h6>
          <div className="card allcard">
            {this.state.cards.map(ele => (
              <AllCards
                cardObj={ele}
                key={ele.id}
                onDeleteCard={this.handleDeleteCard}
              />
            ))}
          </div>
          <Form name={'card'} onAdd={this.handleAddCard} />
        </div>
      </div>
    );
  }
}

export default BoardList;
