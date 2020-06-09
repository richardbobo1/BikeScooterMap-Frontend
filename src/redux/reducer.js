// import paintingsData from '../paintings.json'
// import {combineReducers} from 'redux'

// const initialState = {
//   paintings: paintingsData.paintings, //[100]
//   searchText: ""
// }

// function searchTextReducer(oldState = "", action){
//   //oldState = "some string"
//   switch(action.type){
//     case "SEARCHING":
//       return action.payload //returning the new value of searchText
//     default:
//       return oldState
//   }
// }

// function paintingsReducer(oldState = paintingsData.paintings, action){
//   //oldState = [{},{},{}]
//   switch (action.type) {
//     case "VOTE_FOR_PAINTING":
//       let newPaintings = oldState.map(p => {
//         if(p.id !== action.payload){
//           return p
//         }else{
//           return {
//             ...p,
//             votes: p.votes + 1
//           }
//         }
//       })
//       return newPaintings //return the new array of paintings
//       case "UPDATE_PAINTING_INFO":
//         return oldState.map(painting => {
//           if(painting.id === action.payload.paintingId){
//             return {
//               ...painting,
//               title: action.payload.title,
//               artist: {
//                 ...painting.artist,
//                 name: action.payload.name,
//                 birthday: action.payload.birthday,
//                 deathday: action.payload.deathday
//               }
//             }
//           }
//           return painting
//         })
//     default:
//       return oldState
//   }
// }

// const rootReducer = combineReducers({
//   //key: reducer function
//   searchText: searchTextReducer,
//   paintings: paintingsReducer
// })

// export default rootReducer