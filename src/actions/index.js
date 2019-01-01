/*
 * Actions describe changes of state in your application
 */

// We import constants to name our actions' type
import {
  CHANGE_FORM,
  SET_AUTH,
  MENU_STATUS,
  ITEM_SENT,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR
} from './constants'

import history from '../App/history'
import { message } from 'antd';

let localStorage

// If we're testing, use a local storage polyfill
if (global.process && process.env.NODE_ENV === 'test') {
  localStorage = require('localStorage')
} else {
  // If not, use the browser one
  localStorage = global.window.localStorage
}

/**
 * Sets the form state
 * @param  {object} newFormState          The new state of the form
 * @param  {string} newFormState.username The new text of the username input field of the form
 * @param  {string} newFormState.password The new text of the password input field of the form
 */
export function changeForm (newFormState) {
  return {type: CHANGE_FORM, newFormState}
}

/**
 * Sets the authentication state of the application
 * @param  {boolean} newAuthState True means a user is logged in, false means no user is logged in
 */
export function setAuthState (newAuthState) {
  return {type: SET_AUTH, newAuthState}
}

/**
 * Sets the `currentlySending` state, which displays a loading indicator during requests
 * @param  {boolean} sending True means we're sending a request, false means we're not
 */
export function menuStatus (sending) {
  return {type: MENU_STATUS, sending}
}


export function CartItemSet (item){
    return {type: ITEM_SENT, item}
}

/**
 * Tells the app we want to log in a user
 * @param  {object} data          The data we're sending for log in
 * @param  {string} data.username The username of the user to log in
 * @param  {string} data.password The password of the user to log in
 */
export function loginRequest (data) {
  return {type: LOGIN_REQUEST, data}
}



/**
 * Tells the app we want to register a user
 * @param  {object} data          The data we're sending for registration
 * @param  {string} data.username The username of the user to register
 * @param  {string} data.password The password of the user to register
 */
export function registerRequest (data) {
  return {type: REGISTER_REQUEST, data}
}

/**
 * Sets the `error` state to the error received
 * @param  {object} error The error we got when trying to make the request
 */
export function requestError (error) {
  return {type: REQUEST_ERROR, error}
}

/**
 * Sets the `error` state as empty
 */
export function clearError () {
  return {type: CLEAR_ERROR}
}


/**
 * Tells the app we want to log out a user
 */
export function logout () {
  return dispatch => {
      localStorage.token = '';
      dispatch(setAuthState(false));
      history.push('/')
    }
}


export function loginRequestApi(User,cb) {
  return dispatch => {
    var data = {
      'email':User.username,
      'password':User.password,
    }
    fetch('http://10.2.1.49:5037/api/login', {
      method: 'POST', // or 'PUT'
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(function (myjson) {
        if (myjson.status === 1) {
          localStorage.token = myjson.access_token
          message.success(myjson.message,0.5);
          dispatch(setAuthState(true));
          history.push('/')
        }else{
          message.success(myjson.message,0.5);
        }
        cb(myjson);
      })
  }
}
