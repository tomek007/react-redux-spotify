
import React, { PureComponent } from 'react'
import { Playlist } from '../../core/model/Playlist'

interface Props {
  playlists: Playlist[],
  selectedId?: Playlist['id']
  onSelect(selectedId: Playlist['id']): void
}

export default class PlaylistList extends PureComponent<Props> {

  handleClick = (id: Playlist['id']) => {
    this.props.onSelect(id)
  }

  render() {
    // console.log('render list')
    return (
      <div>
        {/* .list-group>.list-group-item{Text}*3 */}
        <div className="list-group">
          {this.props.playlists.map((playlist, index) =>
            <div className={"list-group-item" + (
              this.props.selectedId === playlist.id ? ' active' : ''
            )} key={playlist.id} onClick={e => this.handleClick(playlist.id)}>
              {index + 1}. {playlist.name}
            </div>
          )}
        </div>
      </div>
    )
  }
}
