import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import AppNavbar from './component/AppNavbar';
import ShoppingList from './component/ShoppingList';
import './App.css';
import {Provider} from 'react-redux';
import store from './store/Store';

class App extends Component {
  render() {
    return (
      <div>
       <Provider store={store}>
       <div>
      <AppNavbar/>
       <ShoppingList/>
       </div>
       </Provider>
       </div>

    );
  }
}

export default App;
