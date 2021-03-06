import React, { Component } from 'react';
import Header from '../header/Header';
import globalVariable from '../../globalVariable';
import BoardList from './BoardLists';
import AddForm from './AddForm';
import { Link } from 'react-router-dom';
import Modal from '../modal/Modal';
import './list.css';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allList: [],
      open: false,
      cardID: '',
      cardName: ''
    };
  }

  onOpenModal = (id, name) => {
    this.setState({ open: true, cardID: id, cardName: name });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

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
    this.setState({
      allList: this.state.allList.concat([data])
    });
  };

  handleDeleteList = async id => {
    const url = `https://api.trello.com/1/lists/${id}/closed?value=true&key=${globalVariable.apiKey}&token=${globalVariable.token}`;
    const response = await fetch(url, {
      method: 'PUT'
    });
    const data = await response.json();
    this.setState({
      allList: this.state.allList.filter(li => li.id !== data.id)
    });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="headContainer">
          <h1 className="boardName">
            <em>{this.props.match.params.name}</em>
          </h1>
          <Link to="/" style={{ alignSelf: 'center' }}>
            <button className="btn-board">
              <span className="btn-text">Boards</span>
            </button>
          </Link>
        </div>
        <div className="listContainer">
          {this.state.allList.map(ele => (
            <BoardList
              list={ele}
              key={ele.id}
              onDeleteList={this.handleDeleteList}
              openModal={this.onOpenModal}
            />
          ))}
          <AddForm name='list' onAdd={this.handleAddList} />
        </div>
        <Modal
          show={this.state.open}
          close={this.onCloseModal}
          cardID={this.state.cardID}
          cardName={this.state.cardName}
        />
      </div>
    );
  }
}

export default List;
