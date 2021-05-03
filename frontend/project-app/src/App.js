import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.css';
import './style.css';
import ProjectM from './components/project/ProjectM'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ProjectM></ProjectM>
      </div>
    );
  }
}

export default App;