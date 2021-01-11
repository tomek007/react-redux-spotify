import React, { Component } from 'react'
import { Playlist } from '../../core/model/Playlist'
import PlaylistDetails from '../components/PlaylistDetails'
import PlaylistEditForm from '../components/PlaylistEditForm'
import PlaylistList from '../components/PlaylistList'

interface Props { }
interface State {
  playlists: Playlist[],
  selected?: Playlist
  mode: 'details' | 'form'
}

export class Playlists extends Component<Props, State> {
  state: State = {
    playlists: [
    ],
    selected: undefined,
    mode: 'details'
  }

  selectPlaylist = (selectedId: number) => {
    const selected = this.state.playlists.find(p => p.id === selectedId)
    this.setState({
      selected
      // this.state.selected?.id === selectedId ? undefined : selected
    })
  }

  switchModeToDetails = () => {
    this.setState({ mode: 'details' })
  }

  switchModeToForm = () => {
    this.setState({ mode: 'form' })
  }

  savePlaylist = (draft: Playlist) => {
    this.setState({
      playlists: this.state.playlists.map(p => p.id === draft.id ? draft : p),
      selected: (draft)
    })
    this.switchModeToDetails()
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col">

            <PlaylistList
              playlists={this.state.playlists}
              selectedId={this.state.selected?.id}
              onSelect={this.selectPlaylist}
            />
              {/* 
              Function Recreated on each render - forces child rerender
              onSelect={id => this.selectPlaylist(id)} */}

          </div>
          <div className="col">
            {this.state.mode} {this.state.selected?.name}

            {this.state.selected ? <div>

              {this.state.mode === 'details' &&
                <PlaylistDetails
                  playlist={this.state.selected}
                  onEdit={this.switchModeToForm} />}

              {this.state.mode === 'form' &&
                <PlaylistEditForm
                  playlist={this.state.selected}
                  onSave={this.savePlaylist}
                  onCancel={this.switchModeToDetails} />}

            </div> : <p>Please select playlist</p>}
          </div>
        </div>

      </div>
    )
  }
}

export default Playlists
