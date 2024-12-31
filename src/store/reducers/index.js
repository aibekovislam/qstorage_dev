import { combineReducers } from 'redux'

import { userState } from './userState'

const rootReducer = combineReducers({
  user: userState,
})

export default rootReducer
