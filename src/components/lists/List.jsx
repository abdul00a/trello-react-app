import React, { Component } from 'react';
import Header from '../Header/Header';
import globalVariable from '../../globalVariable';
import BoardList from './BoardLists';
import Form from './Form';
import './list.css';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allList: []
    };
    console.log(props);
  }

  componentDidMount() {
    const url = `https://api.trello.com/1/boards/${this.props.match.params.id}/lists?cards=none&card_fields=all&filter=open&fields=all&key=${globalVariable.apiKey}&token=${globalVariable.token}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          allList: data
        });
      });
  }

  render() {
    return (
      <div>
        <Header />
        <h1 className="boardName">
          <em>{this.props.match.params.name}</em>
        </h1>
        <div className="listContainer">
          {this.state.allList.map(ele => (
            <BoardList data={ele} key={ele.id} />
          ))}
          <Form name={'list'} />
        </div>
      </div>
    );
  }
}

export default List;
