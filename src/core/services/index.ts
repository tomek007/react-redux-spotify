import Axios, { AxiosError } from "axios";
import { AuthService } from "./AuthService";
import { MusicSearch } from "./MusicSearch";


export const auth = new AuthService({
  auth_url: 'https://accounts.spotify.com/authorize',
  client_id: 'bceba94c95024f3080c7d8b8a4278f1b',
  response_type: 'token',
  redirect_uri: 'https://react-open-pazdziernik.vercel.app/', //  (process.env.REACT_APP_URL || ('http://localhost:'+process.env.REACT_APP_PORT || 3000) + '/',
  state: '',
  scopes: [
    'playlist-modify-private',
    'playlist-read-collaborative',
    'playlist-read-private',
    'playlist-modify-public',
  ],
  show_dialog: true
})

Axios.interceptors.request.use(config => {
  config.headers['Authorization'] = 'Bearer ' + auth.getToken();
  return config
})

Axios.interceptors.response.use(config => config, (err: AxiosError) => {

  if (err.response && err.response.status === 401) {
    auth.authorize()
    // or refresh token: https://github.com/axios/axios/issues/266
  }

  if (err.response) {
    return Promise.reject(err.response?.data.error)
  } else {
    return Promise.reject({ message: 'Unexpected Error' })
  }
})



export const musicService = new MusicSearch()

// placki555@gmail.com pancakes123