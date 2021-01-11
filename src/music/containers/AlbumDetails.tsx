import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loading } from '../../core/components/Loading'
import { Album } from '../../core/model/Album'
import { Track } from '../../core/model/Track'
import { musicService } from '../../core/services'
import { TracksList } from '../../playlists/components/TracksList'
import { AlbumCard } from '../components/AlbumCard'

interface Props {

}

export const AlbumDetails = (props: Props) => {
  const { album_id } = useParams<{ album_id: string }>()
  const [album, setAlbum] = useState<Album>()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedTrackId, setSelectedTrackId] = useState<Track['id'] | undefined>()
  const [selectedTrack, setSelectedTrack] = useState<Track | undefined>()
  const audioPlayerRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        setErrorMessage('')
        setAlbum(await musicService.getAlbumById(album_id))
      } catch (err) { setErrorMessage(err) }
      finally { setLoading(false) }
    })()
  }, [album_id])

  useEffect(() => {
    setSelectedTrack(album?.tracks?.items.find(t => t.id == selectedTrackId))
  }, [selectedTrackId])

  const selectTrack = (id: string) => {
    setSelectedTrackId(id)
  }
  
  useEffect(()=>{
    audioPlayerRef.current?.play()
  }, [selectedTrack/* , isAutoplayEnabled */])

  return (
    <>
      {loading && <Loading />}

      {album && < >
        <div className="row">
          <div className="col">
            <h2>{album.name}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <AlbumCard album={album} />
          </div>
          <div className="col">
            {selectedTrack?.name}

            <audio controls={true} className="w-100" src={selectedTrack?.preview_url} ref={audioPlayerRef} />

            {<TracksList tracks={album.tracks!.items} selectedId={selectedTrackId} onSelect={selectTrack} />}
          </div>
        </div>
      </ >}
    </>
  )
}