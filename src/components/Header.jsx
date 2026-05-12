import './header.css'
import { Link } from 'react-router-dom'
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
export function Header({ cart = [] }) {

  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
const [searchText, setSearchText] = useState('');
const navigate = useNavigate();

  return (
    <div className="header">

      <div className="left-section">
        <Link to="/" className="header-link">
        <img
            className="logo"
            src="/images/icons/akshay-logo.png"
            alt="Akshay Logo"
          />
        
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
          }} />

        <button className="search-button"  onClick={() => {
            navigate(`/?search=${searchText}`);
          }}>
              <img className="search-icon" src="/images/icons/search-icon.png" alt="search" />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="/images/icons/cart-icon.png" alt="cart" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>

    </div>
  );
}