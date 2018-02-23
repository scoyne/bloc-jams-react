import React, { Component } from 'react';
import { Route, } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import { Navbar, Nav, NavItem  } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">BlocJams React</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="/">
                  HOME
                </NavItem>
                <NavItem eventKey={2} href="/Library">
                  LIBRARY
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
