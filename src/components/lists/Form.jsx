import React, { Component } from 'react';
import './form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updiv: '',
      downdiv: '',
      name: ''
    };
  }
  handleCardDisplay = () => {
    this.setState({
      updiv: 'none',
      downdiv: 'block'
    });
  };
  handleBtnDisplay = () => {
    this.setState({
      updiv: 'block',
      downdiv: 'none'
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
          className="btn waves-effect waves-light newlist"
          type="submit"
          name="action"
          onClick={this.handleCardDisplay}
          style={{ display: this.state.updiv, margin: '6px 0 1.2em 1.5em' }}
        >
          ADD {this.props.name}
        </button>
        <div className="add-list" style={{ display: this.state.downdiv }}>
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

export default Form;
