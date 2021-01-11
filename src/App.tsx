import React, { useEffect, useLayoutEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { PlaylistView } from './playlists/containers/PlaylistView';
import { AlbumsSearch } from './music/containers/AlbumsSearch';
import { auth } from './core/services';
import Playlists from './playlists/containers/Playlists';

import { Route, HashRouter, BrowserRouter as Router, Switch, Redirect, Link, NavLink } from 'react-router-dom'
import { NavBar } from './core/components/NavBar';
import { UserContextProvider } from './core/contexts/UserContext';
import { AlbumDetails } from './music/containers/AlbumDetails';
import { store } from './store';
import { PlaylistsRedux } from './playlists/containers/PlaylistsRedux';
import { Provider, useDispatch } from 'react-redux';
import { userLogin } from './reducers/userReducer';
// GEt token from storage
auth.init();

(window as any).store = store

export function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userLogin())
  }, [])

  return (
    <>
      <NavBar />

      <div className="App">
        <div className="container">
          <Switch>
            <Redirect path="/" exact={true} to="/search" />
            <Route path="/playlists/:playlist_id?" component={PlaylistsRedux} />
            <Route path="/search" component={AlbumsSearch} />
            <Route path="/albums/:album_id" component={AlbumDetails} />
            <Route path="**" render={() => <p>Page not found</p>} />
          </Switch>
        </div>
      </div>
    </>
  );
}

// export class App extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         <h1>Hello React!</h1>
//       </div>
//     );
//   }
// }

export default App;
