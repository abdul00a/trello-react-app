import React, { Component } from 'react';
import Header from '../Header/Header';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <Header />
        <h1>{this.props.match.params.id}</h1>
      </div>
    );
  }
}

export default List;
