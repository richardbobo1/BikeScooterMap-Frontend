//constants
export const ADD_ARTICLE = "ADD_ARTICLE";

//reducer
export default function reducer(state = {}, action = {}) {
    switch (action.type) {
      // do reducer stuff
      default: return state;
    }
  }


//action creators
export function addFavorite(payload) {
  return { type: ADD_FAVORITE, payload };
}