import React, { Component } from 'react';
import Modals from 'react-responsive-modal';
import './modal.css';
import globalVariable from '../../globalVariable';
import Form from '../lists/Form';
import CheckList from '../checkList/CheckList';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkList: []
    };
  }

  componentDidUpdate() {
    if (this.props.cardID !== this.state.idPrevCard) {
      if (this.state.checkList.length !== 0) {
        this.setState({ checkList: [] });
      }

      const url = `https://api.trello.com/1/cards/${this.props.cardID}/checklists?checkItems=none&key=${globalVariable.apiKey}&token=${globalVariable.token}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.setState({
            checkList: data,
            idPrevCard: this.props.cardID
          });
        });
    }
  }

  handleAddCheckList = async name => {
    const url = `https://api.trello.com/1/cards/${this.props.cardID}/checklists?name=${name}&pos=bottom&key=${globalVariable.apiKey}&token=${globalVariable.token}`;
    const response = await fetch(url, {
      method: 'POST'
    });
    const data = await response.json();
    this.setState({
      checkList: this.state.checkList.concat([data])
    });
  };

  handleDeleteCheckList = async id => {
    const url = `https://api.trello.com/1/checklists/${id}?key=${globalVariable.apiKey}&token=${globalVariable.token}`;
    await fetch(url, {
      method: 'DELETE'
    });
    this.setState({
      checkList: this.state.checkList.filter(checkList => checkList.id !== id)
    });
  };

  render() {
    const { show, close, cardName } = this.props;

    return (
      <div>
        <Modals open={show} onClose={close}>
          <h2 style={{ width: '80em' }}>{cardName}</h2>
          <span style={{ display: 'flex' }}>
            <Form name={'checklist'} onAdd={this.handleAddCheckList} />
          </span>
          <div className="checklist-container">
            {this.state.checkList.map(ele => (
              <CheckList
                key={ele.id}
                listData={ele}
                onDeleteChecklist={this.handleDeleteCheckList}
              />
            ))}
          </div>
        </Modals>
      </div>
    );
  }
}

export default Modal;
