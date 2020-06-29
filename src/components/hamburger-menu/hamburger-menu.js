import React from "react";
import './hamburger-menu.scss';
import Logo from '../../images/logo.svg';
import {useHistory, useLocation} from "react-router-dom";

const HamburgerMenuSection = ({navigationItems, onMenuClick, pathName}) => {
  return (
    <ul className="nav-list">
      {navigationItems.map(({title, link}) => (
        <li className="nav-list__item" onClick={() => onMenuClick(link)}
            style={pathName === link ? {color: '#007bff'} : null}>
          {title}
        </li>
      ))}
    </ul>
  )
}

const HamburgerMenu = (props) => {
  const history = useHistory();
  const {pathname} = useLocation();

  const navigationItems = [
    {
      title: 'About me',
      link: '/aboutme',
    },
    {
      title: 'Relationships',
      link: '/relationships',
    },
    {
      title: 'Users',
      link: '/signup',
    },
    {
      title: 'Sign Up',
      link: '/signup',
    },
    {
      title: 'Terms and Conditions',
      link: '/signup',
    },
    {
      title: 'How it works',
      link: '/signup',
    },
    {
      title: 'Partnership',
      link: '/signup',
    },
    {
      title: 'Help',
      link: '/signup',
    },
    {
      title: 'Leave testimonial',
      link: '/signup',
    },
    {
      title: 'Contact us',
      link: '/signup',
    },
    {
      title: 'Articles',
      link: '/signup',
    },
    {
      title: 'Our news',
      link: '/signup',
    },
    {
      title: 'Testimonials',
      link: '/signup',
    },
    {
      title: 'Licenses',
      link: '/signup',
    },
    {
      title: 'Privacy Policy',
      link: '/signup',
    },
  ]

  const navigateHandler = (path) => {
    props.onMenuClick();
    history.push(path);
  }

  return (
    <nav className="main-nav">
      <div className="logo-container">
        <img className="logo" src={Logo} width="136" height="20" alt="testtask logo"
             onClick={() => navigateHandler('/')}/>
      </div>
      <HamburgerMenuSection navigationItems={navigationItems.slice(0, 5)}
                            onMenuClick={navigateHandler} pathName={pathname}/>
      <HamburgerMenuSection navigationItems={navigationItems.slice(5, 10)}
                            onMenuClick={navigateHandler} pathName={pathname}/>
      <HamburgerMenuSection navigationItems={navigationItems.slice(10, 15)}
                            onMenuClick={navigateHandler} pathName={pathname}/>
    </nav>
  )
}

export default HamburgerMenu;