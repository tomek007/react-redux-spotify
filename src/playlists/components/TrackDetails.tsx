
import React from 'react'
import { Track } from '../../core/model/Track'

interface Props {
  track: Track
  onEdit(): void
}

// const x = [1,'asd']
// const [nb, str] = x

export const TrackDetails = ({ track, onEdit }: Props) => {
  // const { track } = props

  return (
    <div>
      <dl>
        <dt>Name</dt>
        <dd>{track.name}</dd>

        <dt>Popularity</dt>
        <dd>{track.popularity}</dd>

        <dt>Duration</dt>
        <dd>{track.duration_ms}</dd>
      </dl>

      <button className="btn btn-info" onClick={onEdit}>Edit</button>
    </div>
  )
}
