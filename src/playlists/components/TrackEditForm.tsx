import React, { useEffect, useRef, useState } from 'react'
import { Track } from '../../core/model/Track'

interface Props {
  track: Track
  onSave(trac: Track): void
  onCancel(): void
}

export const TrackEditForm = ({ track, onSave, onCancel }: Props) => {
  const [name, setName] = useState(track.name)
  const [popularity, setPopularity] = useState(track.popularity)
  const [duration, setDuration] = useState(track.duration_ms)
  const nameInputRef = useRef<HTMLInputElement>(null)  

  useEffect(() => {
    // console.log('useEffect')
    setName(track.name)
    setPopularity(track.popularity)
    setDuration(track.duration_ms)
  }, [track])

  useEffect(()=>{
    nameInputRef.current?.focus()
  },[])

  const save = () => { onSave({ ...track, name, popularity, duration_ms: duration }) }

  // console.log('render')
  return (
    <div>

      <div className="form-group">
        <label>Name:</label>
        <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} ref={nameInputRef} />
      </div>

      <div className="form-group">
        <label>Popularity:</label>
        <input type="number" className="form-control" value={popularity} onChange={e => setPopularity(parseInt(e.target.value))} />
      </div>

      <div className="form-group">
        <label>Duration:</label>
        <input type="number" className="form-control" value={duration} onChange={e => setDuration(parseInt(e.target.value))} />
      </div>


      <button className="btn btn-danger" onClick={onCancel}>Cancel</button>
      <button className="btn btn-success" onClick={save}>Save</button>
    </div>
  )
}
