import Axios from "axios";
import { Action, Dispatch, Reducer } from "redux";
import { UserProfile } from "../core/model/User";
import { auth } from "../core/services";
import { fetchCurrentUserPlaylists } from "./playlistsReducer";

interface UserState {
  user?: UserProfile
}


export const userReducer: Reducer<UserState, Actions> = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN_SUCCESS': return {
      ...state,
      user: action.payload.user
    };
    case 'USER_LOGOUT': return {
      ...state, user: undefined
    };
    default: return state
  }
}

type Actions =
  | USER_LOGIN
  | USER_LOGIN_SUCCESS
  | USER_LOGIN_FAILED
  | USER_LOGOUT;

interface USER_LOGIN extends Action<'USER_LOGIN'> { }
interface USER_LOGIN_SUCCESS extends Action<'USER_LOGIN_SUCCESS'> { payload: { user: UserProfile } }
interface USER_LOGIN_FAILED extends Action<'USER_LOGIN_FAILED'> { payload: Error }
interface USER_LOGOUT extends Action<'USER_LOGOUT'> { }

export const userLogin = () => (dispatch: Dispatch<any>) => {

  dispatch(userLoginStart())
  Axios.get<UserProfile>('https://api.spotify.com/v1/me')
    .then(resp => {
      dispatch(userLoginSucess(resp.data))
      dispatch(fetchCurrentUserPlaylists())
    }).catch(err => {
      dispatch(userLoginFailed(err))
    })
}

// userLogin()(dispatch)

export const userLoginStart = (): USER_LOGIN => ({ type: 'USER_LOGIN' });
export const userLoginSucess = (user: UserProfile): USER_LOGIN_SUCCESS => ({ type: 'USER_LOGIN_SUCCESS', payload: { user } })
export const userLoginFailed = (err: any): USER_LOGIN_FAILED => ({ type: 'USER_LOGIN_FAILED', payload: err })
export const userLogout = (): USER_LOGOUT => {
  auth.authorize()
  return ({ type: 'USER_LOGOUT', })
}
