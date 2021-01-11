
// tsrafc
import React, { useState } from 'react'
import { TrackDetails } from '../components/TrackDetails'
import { TrackEditForm } from '../components/TrackEditForm'
import { TracksList } from '../components/TracksList'
import { Track } from '../../core/model/Track'

interface Props {

}

export const PlaylistView = (props: Props) => {
  const [selected, setSelected] = useState<Track | undefined>()
  const [mode, setMode] = useState('details')

  const [tracks, setTracks] = useState([
    { id: '123', name: 'Test 123', popularity: 60, duration_ms: 1230 },
    { id: '234', name: 'Test 234', popularity: 50, duration_ms: 2435 },
    { id: '345', name: 'Test 345', popularity: 30, duration_ms: 6431 },
  ] as Track[])

  const selectTrackById = (id: Track['id']) => {
    setSelected(tracks.find(t => t.id === id))
  }

  const edit = () => { setMode('edit') }
  const saveTrack = (track: Track) => {
    // tracks[0] = track;
    // setTracks(tracks) // Wont work - tracks reference dit not change
    setTracks(tracks.map(t => t.id === track.id ? track : t))
    setSelected(track)
    setMode('details')
  }
  const cancel = () => { setMode('details') }

  return (
    <div>
      <div className="row">
        <div className="col">
          Tracks list
          <TracksList tracks={tracks} onSelect={selectTrackById} selectedId={selected?.id} />
        </div>
        <div className="col">
          Track details
          {selected && mode === 'details' && <TrackDetails track={selected} onEdit={edit} />}
          {selected && mode === 'edit' && <TrackEditForm track={selected} onSave={saveTrack} onCancel={cancel} />}
        </div>
      </div>

    </div>
  )
}
