import React from 'react'
import { Album } from '../../core/model/Album'

interface Props {
  album: Album
}

export const AlbumCard = ({ album }: Props) => {
  return (
    <div className="card">
      <img src={album.images[0].url} className="card-img-top" />

      <div className="card-body">
        <h5 className="card-title">{album.name}</h5>
        {/* <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> */}
      </div>
    </div>

  )
}
