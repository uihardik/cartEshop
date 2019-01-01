import React, {Component} from 'react'
import {connect} from 'react-redux'
import Nav from '../containers/common/Nav'
import Footer from '../containers/common/Footer'
import AppRoutes from './Routers'
import { BrowserRouter } from "react-router-dom";
// import LeftMenu from '../containers/common/LeftMenu'
import PropTypes from 'prop-types'

class App extends Component {
  render () {
    return (
        <BrowserRouter>
        <div>
          <Nav loggedIn={this.props.data.loggedIn}
            currentlySending={this.props.data.currentlySending}
            dispatch={this.props.dispatch}
            location={this.props.location} />
          <div className='wrapper'>
              <AppRoutes/>
          </div>
          <Footer loggedIn={this.props.data.loggedIn}
            currentlySending={this.props.data.currentlySending}
            dispatch={this.props.dispatch}
            location={this.props.location} />
          </div>
      </BrowserRouter>
    )
  }
}

App.propTypes = {
  data: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  children: PropTypes.object,
  dispatch: PropTypes.func
}

function select (state) {
  return {
    data: state
  }
}

export default connect(select)(App)
