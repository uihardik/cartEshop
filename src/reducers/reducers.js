
/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  CHANGE_FORM,
  SET_AUTH,
  MENU_STATUS,
  ITEM_SENT,
  REQUEST_ERROR,
  CLEAR_ERROR,
} from '../actions/constants'
import auth from '../auth'

// The initial application state
let initialState = {
  formState: {
    username: '',
    password: ''
  },
  item:[],
  error: '',
  collapsed:false,
  currentlySending: false,
  loggedIn: auth.loggedIn()
}

// Takes care of changing the application state
function reducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM:
      return {...state, formState: action.newFormState}
    case SET_AUTH:
      return {...state, loggedIn: action.newAuthState}
    case MENU_STATUS:
      return {...state, collapsed: action.sending}
    case ITEM_SENT:
        return {...state, item: [...state.item, action.item]}
    case REQUEST_ERROR:
      return {...state, error: action.error}
    case CLEAR_ERROR:
      return {...state, error: ''}
    default:
      return state
  }
}

export default reducer
