import React, { Component } from 'react';
import './form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updiv: '',
      downdiv: ''
    };
    // console.log(props);
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

  render() {
    return (
      <div className="list">
        <button
          className="btn waves-effect waves-light newlist"
          type="submit"
          name="action"
          onClick={this.handleCardDisplay}
          style={{ display: this.state.updiv, margin: '6px 0 5px 0' }}
        >
          ADD List
        </button>
        <div className="add-list" style={{ display: this.state.downdiv }}>
          <div className="input-field col s6">
            <input
              id="input_text"
              type="text"
              data-length="3"
              style={{
                backgroundColor: '#fff',
                paddingLeft: '5px',
                margin: '0'
              }}
              placeholder={`Enter ${this.props.name} title...`}
            />
          </div>
          <div className="addlist">
            <button
              className="btn waves-effect waves-light add"
              type="submit"
              name="action"
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
