import {createStore} from 'redux'
import rootReducer from "../reducer";


const initialState = {
    routes: [],
    favorites: []
}

const reducer = (currentState=initialState, action) => {
  let newState;
  
  switch(action.type){

    case "ADD_FAVORITE":
      newState = {favorites: currentState.favorites.push() + action.payload}
      return newState

    case "REMOVE_FAVORITE":
      newState = {count: currentState.count - action.payload}
      return newState

    case "ADD_ROUTE":
    newState = {count: currentState.count - action.payload}
    return newState


    default:
      return currentState
  }
}

let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store