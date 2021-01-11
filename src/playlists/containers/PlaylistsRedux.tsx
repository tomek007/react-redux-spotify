
import React, { FC, useCallback, useMemo } from 'react'
import { useStore, useDispatch, useSelector } from 'react-redux'
import { Route, useHistory, useParams } from 'react-router-dom'
import { playlistByIdSelector, playlistsListSelector, playlistUpdate, saveUpdatedPlaylist } from '../../reducers/playlistsReducer'
import PlaylistDetails from '../components/PlaylistDetails'
import PlaylistEditForm from '../components/PlaylistEditForm'
import PlaylistList from '../components/PlaylistList'

export const PlaylistsRedux: FC = (props) => {
  // const store = getStore().getState()
  const { playlist_id } = useParams<{ playlist_id: string }>()
  const { replace, push } = useHistory()
  const playlists = useSelector(playlistsListSelector)
  const selected = useSelector(playlistByIdSelector(playlist_id))
  const message = useSelector((state: any) => state.playlists.message)
  const dispatch = useDispatch()

  const selectPlaylistById = useCallback((id: number | string): void => replace('/playlists/' + id), [])

  return ( //useMemo(() => (
    <div>
      {message && <p className="alert alert-danger">{message}</p>}

      <div className="row">
        <div className="col">
          <PlaylistList playlists={playlists} selectedId={playlist_id} onSelect={selectPlaylistById} />
        </div>
        <div className="col">
          {selected && <>
            <Route path="/playlists/:playlist_id" exact={true} render={() =>
              <PlaylistDetails
                playlist={selected}
                onEdit={() => push(playlist_id + '/edit')} />
            } />

            <Route path="/playlists/:playlist_id/edit" render={() =>
              <PlaylistEditForm
                playlist={selected}
                onSave={async (draft) => {
                  await dispatch(saveUpdatedPlaylist(draft));
                  selectPlaylistById(playlist_id)
                }}
                onCancel={() => selectPlaylistById(playlist_id)} />
            } />
          </>}
        </div>
      </div>
    </div>)
  // ), [playlists, playlist_id, message])
}
