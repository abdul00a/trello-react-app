import React, { Component } from 'react';
import './checklist.css';
import globalVariable from '../../globalVariable';
import CheckItems from '../cehckitems/CheckItems';
import Form from '../lists/Form';

class CheckList extends Component {
  state = {
    checkItems: []
  };

  handleState = async event => {
    let state = 'incomplete';
    event.target.checked === true
      ? (state = 'complete')
      : (state = 'incomplete');
    const url = `https://api.trello.com/1/cards/${this.props.listData.idCard}/checkItem/${event.target.id}?state=${state}&key=${globalVariable.apiKey}&token=${globalVariable.token}`;
    await fetch(url, {
      method: 'PUT'
    });
  };

  componentDidMount() {
    const url = `https://api.trello.com/1/checklists/${this.props.listData.id}/checkItems?key=${globalVariable.apiKey}&token=${globalVariable.token}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          checkItems: data
        });
      });
  }

  handleAddItems = async name => {
    const url = `https://api.trello.com/1/checklists/${this.props.listData.id}/checkItems?name=${name}&nameData=null&limits=none&pos=bottom&checked=false&key=${globalVariable.apiKey}&token=${globalVariable.token}`;
    const response = await fetch(url, {
      method: 'POST'
    });
    const item = await response.json();
    this.setState({
      checkItems: this.state.checkItems.concat([item])
    });
  };

  handleDeleteItems = async id => {
    const url = `https://api.trello.com/1/checklists/${this.props.listData.id}/checkItems/${id}?key=${globalVariable.apiKey}&token=${globalVariable.token}`;
    await fetch(url, {
      method: 'DELETE'
    });
    this.setState({
      checkItems: this.state.checkItems.filter(item => item.id !== id)
    });
  };

  render() {
    return (
      <div className="checklist-container">
        <div className="check-list">
          <div className="listName" id={this.props.listData.id}>
            <span style={{ alignSelf: 'center', paddingTop: '0.5em' }}>
              <i className="material-icons">check_box</i>
            </span>
            <span className="name">{this.props.listData.name}</span>
          </div>
          <span
            className="del-btn"
            onClick={e => {
              e.stopPropagation();
              this.props.onDeleteChecklist(this.props.listData.id);
            }}
          >
            DELETE
          </span>
        </div>
        <hr style={{ margin: '2px 0 1.5em 0' }} />
        <div className="checkitems-container">
          {this.state.checkItems.map(item => (
            <CheckItems
              key={item.id}
              name={item.name}
              id={item.id}
              ItemState={item.state}
              onStatus={this.handleState}
              onDelItem={this.handleDeleteItems}
            />
          ))}
        </div>
        <div style={{ display: 'flex' }}>
          <Form name={'checkItem'} onAdd={this.handleAddItems} />
        </div>
      </div>
    );
  }
}

export default CheckList;
