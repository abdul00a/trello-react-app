import React, { Component } from 'react';
import './AllBoard.css';
import globalVariable from '../../globalVariable';
import Board from './Board';

class AllBoard extends Component {
  constructor() {
    super();
    this.state = {
      allBoard: []
    };
  }

  componentDidMount() {
    const url = `https://api.trello.com/1/members/me/boards?key=${globalVariable.apiKey}&token=${globalVariable.token}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          allBoard: data
        });
      });
  }
  render() {
    return (
      <section>
        <div>
          <h1 className="boardText">All Trello Boards:</h1>
          <div>
            <ul className="boardContainer">
              {this.state.allBoard.map(ele => (
                <Board
                  key={ele.id}
                  id={ele.id}
                  name={ele.name}
                  imgURL={ele.prefs.backgroundImage}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default AllBoard;
