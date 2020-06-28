import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Logo from '../../images/logo.svg';
import MenuHamburger from '../../images/menu-icon.svg';
import './header.scss';

const Header = (props) => {
  const history = useHistory();

  const menuClickHandler = () => {
    props.onMenuClick();
  }

  const navigateHandler = (link) => {
    history.push(link);
  }

  let returnValue = (
    <header className="main-header">
      <img src={Logo} width="136" height="20" alt="testtask logo" onClick={() => navigateHandler('/')}
           style={{cursor: 'pointer'}}/>
      <nav className="nav">
        <img className="menu-hamburger" src={MenuHamburger} width="20" height="15"
             alt="navigation menu icon"
             onClick={menuClickHandler}/>
        <ul className="nav-list">
          <li className="nav-list__item" onClick={() => navigateHandler('/aboutme')}>About me</li>
          <li className="nav-list__item" onClick={() => navigateHandler('/relationships')}>Relationships</li>
          <li className="nav-list__item" onClick={() => navigateHandler('/signup')}>Requirements</li>
          <li className="nav-list__item" onClick={() => navigateHandler('/signup')}>Users</li>
          <li className="nav-list__item" onClick={() => navigateHandler('/signup')}>Sign Up</li>
        </ul>
      </nav>
    </header>
  );


  return returnValue;
};

export default Header;