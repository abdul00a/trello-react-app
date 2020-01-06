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

  render() {
    return (
      <div className="lists">
        <div className="card cards">
          <h6 className="header">{this.props.data.name}</h6>
          <div className="card allcard">
            {this.state.cards.map(ele => (
              <AllCards cardObj={ele} key={ele.id} />
            ))}
          </div>
          <Form name={'card'} />
        </div>
      </div>
    );
  }
}

export default BoardList;
