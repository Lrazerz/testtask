import React, {useState} from 'react';
import './App.scss';
import Header from "./components/header";
import HamburgerMenu from "./components/hamburger-menu";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import HomePage from "./pages/home-page";
import AboutMe from "./pages/about-me";
import SignUp from "./pages/sign-up";
import Relationships from "./pages/relationships";
import { Provider } from 'react-redux'
import store from "./redux/store";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuClickHandler = () => {
    setIsMenuOpen(prevState => !prevState);
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header onMenuClick={menuClickHandler}/>
          {isMenuOpen && <HamburgerMenu onMenuClick={menuClickHandler}/>}
            <Switch>
              <Route path="/" exact>
                <HomePage/>
              </Route>
              <Route path="/aboutme" exact>
                <AboutMe/>
              </Route>
              <Route path="/relationships" exact>
                <Relationships/>
              </Route>
              <Route path="/signup" exact>
                <SignUp/>
              </Route>
            </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
