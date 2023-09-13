import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'

const NavBar = () => {
  return (
    <nav id="navbar">
      <ul id="navbar-list">
        <li>
          <Link to="/add">Add new words</Link>
        </li>
        <li>
          <Link to="/quiz">Quiz</Link>
        </li>
        <li>
          <Link to="/list">Show full list</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
