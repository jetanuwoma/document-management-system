import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const axiosInstance = axios.create({
  timeout: 5000,
  headers: { 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjcsIlJvbGVJZCI6MSwiaWF0IjoxNDk2NDg2MjA0LCJleHAiOjE0OTY3NDU0MDR9.BqcYDneEtVleQgzlQRNtvdI8nseTFDx2Qj4TAzqXXxI' }
});

class App extends Component {

  componentDidMount() {
    axiosInstance.get('/api/users')
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Jude User interface</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
