import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css'; // Import the CSS

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Cart</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
