import React from 'react'
import { useHistory } from 'react-router-dom'
import { Album } from '../../core/model/Album'
import { AlbumCard } from './AlbumCard'

interface Props {
  results: Album[]
}

export const SearchResults = ({ results }: Props) => {
  const { push } = useHistory()
  
  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 no-gutters">

        {results.map(result =>
          <div className="col mb-4" key={result.id}
            onClick={() => push('/albums/' + result.id)}>
            <AlbumCard album={result} />
          </div>
        )}

      </div>
    </div>
  )
}
