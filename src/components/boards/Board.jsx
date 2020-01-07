import React from 'react';
import './board.css';
import { Link } from 'react-router-dom';

const Board = ({ board }) => {
  return (
    <li className="boardElement">
      <Link to={`/board/${board.id}/${board.name}`}>
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
        </div>
      </Link>
    </li>
  );
};

export default Board;
