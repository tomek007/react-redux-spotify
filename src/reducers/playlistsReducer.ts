import Axios from "axios";
import { Action, ActionCreator, Dispatch, Reducer } from "redux";
import { PagingObject } from "../core/model/PagingObject";
import { Playlist } from "../core/model/Playlist";

export const playlistsReducerKey = 'playlists';

interface PlaylistsState {
  items: Playlist[],
  message: string
}

const initialState: PlaylistsState = {
  items: [],
  message: ''
}


/* == REDUCER */
export const playlistsReducer: Reducer<PlaylistsState, Actions> = (
  state = initialState,
  action
) => {

  switch (action.type) {
    case 'PLAYLISTS_LOAD_SUCCESS': return { ...state, items: action.payload };
    case 'PLAYLISTS_UPDATE': return {
      ...state,
      items: state.items.map(p => p.id === action.payload.id ? action.payload : p)
    };
    case 'PLAYLISTS_SAVE_FAILED': return {
      ...state,
      message: action.payload.message
    }
    default: return state
  }
}
/* == ACTION TYPES */
type Actions =
  | PLAYLISTS_LOAD_START
  | PLAYLISTS_LOAD_SUCCESS
  | PLAYLISTS_UPDATE
  | PLAYLISTS_SAVE_FAILED

interface PLAYLISTS_LOAD_START extends Action<'PLAYLISTS_LOAD'> { payload: Playlist[] }
interface PLAYLISTS_LOAD_SUCCESS extends Action<'PLAYLISTS_LOAD_SUCCESS'> { payload: Playlist[] }
interface PLAYLISTS_LOAD_FAILED extends Action<'PLAYLISTS_LOAD_FAILED'> { payload: Error }
interface PLAYLISTS_UPDATE extends Action<'PLAYLISTS_UPDATE'> { payload: Playlist }
interface PLAYLISTS_SAVE extends Action<'PLAYLISTS_SAVE'> { payload: Playlist }
interface PLAYLISTS_SAVE_SUCCESS extends Action<'PLAYLISTS_SAVE_SUCCESS'> { payload: Playlist }
interface PLAYLISTS_SAVE_FAILED extends Action<'PLAYLISTS_SAVE_FAILED'> { payload: Error }

/* == ACTION CREATORS */
export const playlistsLoad: ActionCreator<PLAYLISTS_LOAD_SUCCESS> = (payload: Playlist[]) => ({ type: 'PLAYLISTS_LOAD_SUCCESS', payload })
export const playlistsLoadFailed: ActionCreator<PLAYLISTS_LOAD_FAILED> = (payload: Error) => ({ type: 'PLAYLISTS_LOAD_FAILED', payload })
export const playlistUpdate: ActionCreator<PLAYLISTS_UPDATE> = (payload: Playlist) => ({ type: 'PLAYLISTS_UPDATE', payload })
export const playlistSave: ActionCreator<PLAYLISTS_SAVE> = (payload: Playlist) => ({ type: 'PLAYLISTS_SAVE', payload })
export const playlistSaveSuccess: ActionCreator<PLAYLISTS_SAVE_SUCCESS> = (payload: Playlist) => ({ type: 'PLAYLISTS_SAVE_SUCCESS', payload })
export const playlistSaveFailed: ActionCreator<PLAYLISTS_SAVE_FAILED> = (payload: Error) => ({ type: 'PLAYLISTS_SAVE_FAILED', payload })

export const fetchCurrentUserPlaylists = () => async (dispatch: Dispatch) => {
  try {
    const res = await Axios.get<PagingObject<Playlist>>('https://api.spotify.com/v1/me/playlists')
    dispatch(playlistsLoad(res.data.items))
  } catch (err) { dispatch(playlistsLoadFailed(err)) }
}

export const saveUpdatedPlaylist = (draft: Playlist) => async (dispatch: Dispatch) => {
  try {
    dispatch(playlistSave(draft))
    await Axios.put<Playlist>(`https://api.spotify.com/v1/playlists/${draft.id}`, {
      name: draft.name,
      public: draft.public,
      description: draft.description
    })
    // dispatch(playlistSaveSuccess(draft))
    dispatch(playlistUpdate(draft))
  } catch (err) { dispatch(playlistSaveFailed(err)) }
}

type StorePartial = {
  playlists: PlaylistsState;
};

/* == SELECTOR */
export const playlistsListSelector = (state: StorePartial) => {
  return state.playlists.items
}

export const playlistByIdSelector = (playlist_id: Playlist['id']) => //
  (state: StorePartial) => state.playlists.items.find((p) => p.id === playlist_id)