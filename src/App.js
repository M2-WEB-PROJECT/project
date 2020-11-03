import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.sass';
import Login from './screens/LoginScreen'
// import Register from './pages/Register'

class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <div>
            <Route path="/" exact component={Login}/>
            {/*<Route path="/register" exact component={Register}/>*/}
          </div>
        </BrowserRouter>
    )
  }

}
export default App;