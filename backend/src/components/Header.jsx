import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link> | <Link to="/restaurants">Restaurant List</Link> | <Link to="/restaurant/1">Restaurant Detail</Link>
      </nav>
    </header>
  );
};

export default Header;
