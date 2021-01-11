
// tsrafce
import React from 'react'
import { Card } from '../../core/components/Card'
import { Playlist } from '../../core/model/Playlist'
import './PlaylistDetails.css'

interface Props {
  playlist: Playlist,
  onEdit(): void
}

const PlaylistDetails = React.memo((props: Props) => {

  return (
    <Card>
      <div data-playlist-id={props.playlist.id}>
        <dl>
          <dt>Name:</dt>
          <dd style={{ fontSize: '20px' }}>{props.playlist.name}</dd>

          <dt>Public:</dt>

          {/* Helper:  https://www.npmjs.com/package/classnames */}
          <dd className={'is-public ' + (props.playlist.public ? 'is-public-yes' : 'is-public-no')}>
            {props.playlist.public ? 'Yes' : 'No'}
          </dd>

          <dt>Description:</dt>
          <dd>{props.playlist.description}</dd>
        </dl>

        <button className="btn btn-info"
          onClick={e => props.onEdit()}>Edit</button>
      </div>
    </Card>
  )
}/*, propsAreEqual?: ((prevProps: Readonly<Props>, nextProps: Readonly<Props>) => boolean) */)

export default PlaylistDetails
