import 'babel-polyfill'

import React, {Component } from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store/store';
import App from './App/App'

import './styles/main.css'
import 'antd/dist/antd.css';

class AppFlow extends Component {
  render () {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

ReactDOM.render(<AppFlow />, document.getElementById('app'))
