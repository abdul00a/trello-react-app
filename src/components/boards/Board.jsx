import React from 'react';
import './board.css';
import { Link } from 'react-router-dom';
// import List from '../lists/List';

const Board = ({ board }) => {
  // console.log(board.id);
  return (
    <li key={board.id} data-id={board.id}>
      <Link to={`/list/${board.id}`}>
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img
              className="activator"
              src={board.img}
              height="200px"
              width="200px"
              alt=""
            />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">
              {board.name}
            </span>
          </div>
          {/* <li><Link to="/">Home</Link></li> */}
          {/* <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">Card Title</span>
      </div> */}
        </div>
      </Link>
    </li>
  );
};

export default Board;
