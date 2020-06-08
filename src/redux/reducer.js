import store from './store'

function rootReducer(state = initialState, action) {
    return state;
  };
  
    function render(){
        document.body.textContent = state.count
    }

  export default rootReducer;