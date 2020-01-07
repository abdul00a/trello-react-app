import React, { Component } from 'react';
import './AllBoard.css';
import globalVariable from '../../globalVariable';
import Board from './Board';

class AllBoard extends Component {
  constructor() {
    super();
    this.state = {
      allBoards: [],
      boardData: []
    };
  }
  displayBoard = async () => {
    const val = this.state.allBoards.reduce((acc, boardObj) => {
      const obj = {};
      obj.name = boardObj.name;
      obj.id = boardObj.id;
      obj.img = boardObj.prefs.backgroundImage;
      acc.push(obj);
      return acc;
    }, []);
    this.setState({
      boardData: val
    });
  };
  componentDidMount() {
    const url = `https://api.trello.com/1/members/me/boards?key=${globalVariable.apiKey}&token=${globalVariable.token}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          allBoards: data
        });
      });
  }
  render() {
    return (
      <section>
        <div>
          <div className="board-head">
            <button
              onClick={this.displayBoard}
              className="btn btn-primary btn-lg"
            >
              Display Boadrs
            </button>
            <h1 className="boardText">All Trello Boards:</h1>
          </div>
          <div>
            <ul className="boardContainer">
              {this.state.boardData.map(ele => (
                <Board board={ele} key={ele.id} />
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default AllBoard;
