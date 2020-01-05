import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header>
      <img
        src="https://a.trellocdn.com/prgb/dist/images/header-logo-2x.01ef898811a879595cea.png"
        className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
        alt="trello-icon"
      />
    </header>
  );
};

export default Header;
