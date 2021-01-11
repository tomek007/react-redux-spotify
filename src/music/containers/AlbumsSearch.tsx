
import React, { Reducer, useEffect, useReducer, useState } from 'react'
import { RouteComponentProps, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'
import { Album } from '../../core/model/Album'
import { musicService } from '../../core/services'
import { SearchForm } from '../components/SearchForm'
import { SearchResults } from '../components/SearchResults'
import { Loading } from '../../core/components/Loading'


const mockData = [
  { id: '123', name: 'Test album 123', images: [{ url: 'https://www.placecage.com/c/400/400' }] },
  { id: '234', name: 'Test album 234', images: [{ url: 'https://www.placecage.com/c/500/500' }] },
  { id: '345', name: 'Test album 345', images: [{ url: 'https://www.placecage.com/c/600/600' }] },
] as Partial<Album>[]


type State = {
  query: string;
  message: string;
  loading: boolean;
  results: Album[];
}
type ActionTypes = 'SEARCH_START' | 'SEARCH_SUCCESS' | 'SEARCH_FAILED';

/* ====== */

const initialState = {
  query: 'batman',
  message: '',
  loading: false,
  results: []
}
interface SEARCH_START {
  (payload: { query: string }): { type: 'SEARCH_START', payload: { query: string } }
}


const reducer: Reducer<State, any> = (state, action) => {
  switch (action.type) {
    case 'SEARCH_START': return {
      ...state,
      query: action.payload.query,
      loading: true,
      message: '',
      results: []
    };
    case 'SEARCH_SUCCESS': return {
      ...state,
      loading: false,
      results: action.payload.results
    };
    case 'SEARCH_FAILED': return {
      ...state,
      loading: false,
      message: action.payload.message
    };
    default:
      return state
  }
}

const searchStart = ({ query }: any) => ({ type: 'SEARCH_START', payload: { query } });
const searchSuccess = ({ results }: any) => ({ type: 'SEARCH_SUCCESS', payload: { results } });
const searchFailed = ({ message }: any) => ({ type: 'SEARCH_FAILED', payload: { message } });

const searchAlbumsAction = (dispatch: React.Dispatch<any>) => async (query: string) => {
  try {
    dispatch(searchStart({ query }))
    const results = await musicService.searchAlbums(query)
    dispatch(searchSuccess({ results }))

  } catch (err) { dispatch(searchFailed({ message: err.message })) }
}

/* ==== */

type Props = {} & RouteComponentProps<{}>

export const AlbumsSearch = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { push, replace } = useHistory()

  const searchAlbums = (query: string) => {
    // push('/search?q=test')
    if (state.query !== query)
      // push({
      replace({
        pathname: '/search',
        search: new URLSearchParams({ q: query }).toString()
      })
  }

  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const q = (queryParams.get('q')) || 'batman'

  useEffect(() => {
    q && searchAlbumsAction(dispatch)(q)
  }, [q])


  return (
    <div>
      <div className="row">
        <div className="col">
          <SearchForm query={state.query} onSearch={searchAlbums} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          {state.message && <p className="alert alert-danger">{state.message}</p>}

          {state.loading && <Loading />}

          <SearchResults results={state.results} />
        </div>
      </div>
    </div>
  )
}


