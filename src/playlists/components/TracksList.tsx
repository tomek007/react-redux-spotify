

import React from 'react'
import { Track } from '../../core/model/Track'

interface Props {
  tracks: Track[]
  selectedId?:Track['id']
  onSelect(id: Track['id']):void
}


export const TracksList = (props: Props) => {

  return (
    <div>
      <div className="list-group">
        {props.tracks.map(track =>
          <div className={"list-group-item " + (track.id === props.selectedId ? 'active' : '')}
            key={track.id} onClick={() => props.onSelect(track.id)}>
            {track.name}
          </div>
        )}
      </div>
    </div>
  )
}
