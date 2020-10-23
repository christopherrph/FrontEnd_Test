import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import home from './pages/home';


class App extends Component{
  render(){
    return(
      <div>
        <Route path='/' component={home} exact />
      </div>  
    )
  }
}

export default App;

