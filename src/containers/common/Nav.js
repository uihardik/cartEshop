import React, {Component} from 'react'
import LoadingButton from './LoadingButton'
import { Button} from 'antd';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import {logout, menuStatus, clearError} from './../../actions'

class Nav extends Component {
  state = {
   size: 'default',
   collapsed: true,
 };
  constructor (props) {
    super(props)
    this._logout = this._logout.bind(this)
    this._clearError = this._clearError.bind(this)
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
    this.props.dispatch(menuStatus(this.state.collapsed))
  }

  render () {
     const size = this.state.size;
    const navButtons = (
      <div>
      </div>
    )

    return (
      <div className='nav'>
        <div className='nav__wrapper'>
          <Link to='/' className='nav__logo-wrapper' onClick={this._clearError}>
            <h1 className='nav__logo'>Login&nbsp;Flow</h1>
          </Link>
          {navButtons}
        </div>
      </div>
    )
  }

  _logout () {
    this.props.dispatch(logout())
  }

  _clearError () {
    this.props.dispatch(clearError())
  }
}

Nav.propTypes = {
  loggedIn: PropTypes.bool,
  currentlySending: PropTypes.bool,
  dispatch: PropTypes.func
}

export default Nav;
