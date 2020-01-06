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
    // console.log(props);
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

  handleAddList = async name => {
    const url = `https://api.trello.com/1/lists?name=${name}&idBoard=${this.props.match.params.id}&pos=bottom&key=${globalVariable.apiKey}&token=${globalVariable.token}`;
    const response = await fetch(url, {
      method: 'POST'
    });
    const data = await response.json();
    // console.log(data);
    this.setState({
      allList: this.state.allList.concat([data])
    });
  };

  handleDeleteList = async id => {
    // console.log(id);
    const url = `https://api.trello.com/1/lists/${id}/closed?value=true&key=${globalVariable.apiKey}&token=${globalVariable.token}`;
    const response = await fetch(url, {
      method: 'PUT'
    });
    const data = await response.json();
    // console.log(data);
    this.setState({
      allList: this.state.allList.filter(li => li.id !== data.id)
    });
  };

  render() {
    return (
      <div>
        <Header />
        <h1 className="boardName">
          <em>{this.props.match.params.name}</em>
        </h1>
        <div className="listContainer">
          {this.state.allList.map(ele => (
            <BoardList
              data={ele}
              key={ele.id}
              onDeleteList={this.handleDeleteList}
            />
          ))}
          <Form name={'list'} onAdd={this.handleAddList} />
        </div>
      </div>
    );
  }
}

export default List;
