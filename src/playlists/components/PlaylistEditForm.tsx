
import React, { FC, PureComponent } from 'react'
import { Card } from '../../core/components/Card'
import { Playlist } from '../../core/model/Playlist'

interface Props {
  onCancel(): void
  onSave(draft: Playlist): void
  playlist: Playlist,
}

interface State {
  draft: Playlist,
}

export class PlaylistEditForm extends PureComponent<Props, State> {
  state = {
    draft: this.props.playlist, // Done ONLY once - WIll not be updated!
  }

  constructor(props: Props) {
    super(props)
    console.log('constructor')
  }


  static getDerivedStateFromProps(nextProps: Readonly<Props>, prevState: State) {
    console.log('getDerivedStateFromProps')

    return /* nextState */{
      draft: nextProps.playlist.id === prevState.draft.id ? prevState.draft : nextProps.playlist
    }
  }

  // or extends PureComponent
  // shouldComponentUpdate(nextProps:Props, nextState:State) {
  //   console.log('shouldComponentUpdate')
  //   return this.props.playlist !== nextProps.playlist ||
  //         this.state.draft !== nextState.draft
  // }

  getSnapshotBeforeUpdate(prevProps = {}, prevState = {}) {
    console.log('getSnapshotBeforeUpdate')
    return { scrollPosition: 123 }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
    console.log('componentDidUpdate', snapshot)
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }


  handleChange = (event: React.ChangeEvent<any>) => {
    // this.state.draft.name = event.target.value;
    // this.setState({})

    this.setState(() => {
      const fieldName = event.target.name
      const type = event.target.type
      const value = type === 'checkbox' ? event.target.checked : event.target.value

      return {
        draft: {
          ...this.state.draft,
          [fieldName]: value,
        }
      }
    })
  }

  nameInputRef = React.createRef<HTMLInputElement>()

  componentDidMount() {
    console.log('componentDidMount')
    this.nameInputRef.current?.focus()
  }

  render() {
    console.log('render virutal dom')
    return (
      <Card>
        {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
        {/* .form-group>label{Name:}+input.form-control */}
        <div className="form-group">
          <label htmlFor="">Name:</label>
          <input type="text" className="form-control" value={this.state.draft.name} name="name" onChange={this.handleChange} ref={this.nameInputRef} />
          {170 - this.state.draft.name.length} / 170
        </div>

        {/* .form-group>label>input[type=checkbox]+{Public} */}
        <div className="form-group">
          <label htmlFor=""><input type="checkbox" checked={this.state.draft.public} name="public" onChange={this.handleChange} /> Public </label>
        </div>

        {/* .form-group>label{Description:}+textarea.form-control */}
        <div className="form-group">
          <label htmlFor="">Description:</label>
          <textarea className="form-control" value={this.state.draft.description} name="description" onChange={this.handleChange} ></textarea>
        </div>

        <FormGroup label="extra" value={this.state.draft.name} name="name" onChange={console.log}>
          <p>Extra message</p>
        </FormGroup>

        <button className="btn btn-danger"
          onClick={this.props.onCancel}>
          Cancel</button>

        <button className="btn btn-success"
          onClick={e => this.props.onSave(this.state.draft)}>Save</button>
      </Card>
    )
  }
}

export default PlaylistEditForm


const FormGroup: FC<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  & { label: string, children: React.ReactElement, onChange: (value: string) => void }
> = ({ label, children, onChange, ...props }) => <div className="form-group">
  <label htmlFor="">{label} </label>
  <input type="text" className="form-control" onChange={e => onChange(e.target.value)} {...props} />
  {children}
</div>