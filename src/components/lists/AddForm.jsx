import React, { Component } from 'react';
import './form.css';

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      show: false
    };
  }
  handleCardDisplay = () => {
    this.setState({
      show: true
    });
  };
  handleBtnDisplay = () => {
    this.setState({
      show: false
    });
  };

  hanleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name } = this.state;

    const inputStyle = {
      backgroundColor: '#fff',
      paddingLeft: '5px',
      margin: '0',
      width: '300px',
      borderRadius: '0.3em'
    };

    return (
      <div className="list">
        <button
          className="btn waves-effect waves-light add-btn"
          type="submit"
          name="action"
          onClick={this.handleCardDisplay}
          style={{
            display: !this.state.show ? 'block' : 'none'
          }}
        >
          ADD {this.props.name}
        </button>
        <div
          className="add-list"
          style={{ display: this.state.show ? 'block' : 'none' }}
        >
          <div className="input-field col s6">
            <input
              type="text"
              name="name"
              value={name}
              data-length="3"
              style={inputStyle}
              placeholder={`Enter ${this.props.name} title...`}
              onChange={this.hanleChange}
            />
          </div>
          <div className="addlist">
            <button
              className="btn waves-effect waves-light add"
              onClick={() => this.props.onAdd(name)}
            >
              ADD
            </button>
            <i
              className="small material-icons close"
              onClick={this.handleBtnDisplay}
            >
              close
            </i>
          </div>
        </div>
      </div>
    );
  }
}

export default AddForm;
