import { applyMiddleware, combineReducers, createStore, Dispatch, Middleware, Reducer } from "redux";
import { playlistsLoad, playlistsReducer, playlistsReducerKey } from "./reducers/playlistsReducer";
import { userReducer } from "./reducers/userReducer";
import thunk from 'redux-thunk'
// import thunk from 'redux-promise'
// import thunk from 'redux-saga'

// const reducer:Reducer = (state,action)=>{
//   return {
//     ...state,
//     playlists: playlistsReducer(state.playlists),
//     search: searchReducer(state.search),
//   }
// }

const counter: Reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INC': return state + 1;
    case 'DEV': return state - 1;
    default: return state
  }
}

// const thunk: Middleware = (store) => (next) => (action: any) => {
//   console.log(action)
//   if ('function' === typeof action) {
//     action(store.dispatch)
//   } else {
//     next(action)
//   }
//   // console.log(store.getState())
// };
// or use redux-thunk

export const store = createStore(combineReducers({
  counter: counter,
  user: userReducer,
  [playlistsReducerKey]: playlistsReducer
}), applyMiddleware(thunk))


store.dispatch(playlistsLoad([
  { id: '123', name: 'React Hits', public: false, description: 'best hits' },
  { id: '234', name: 'React Top20', public: true, description: 'best 20 hits' },
  { id: '345', name: 'Best of React ', public: false, description: 'best of react' },
]))