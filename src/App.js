import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "normalize.css";
import {BrowserRouter, Route} from 'react-router-dom';


import NavBar from './Containers/Navbar';
import MyCv from './Components/MyCv';
import Contact from './Components/Contact';


class App extends Component {
  render() {
    return ([
      <NavBar key="nav"/>,
      <Route path="/" exact render={()=>{return <MyCv></MyCv>}} key="cvLink"/>,
      <Route path="/contact" exact key="contactLink" render={()=>{return <Contact/>}}/>,
      <footer></footer>
    ]
    );
  }
}

export default App;
