import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { UserProfile } from '../contexts/UserProfile'

interface Props {

}

export const NavBar = (props: Props) => {
  const [open, setOpen] = useState(false)

  const toggle = () => { setOpen(!open) }

  return (
    <nav className="navbar navbar-expand-sm mb-3 navbar-dark bg-dark">
      <div className="container">

        <NavLink className="navbar-brand" exact={true} to="/" activeClassName="placki">
          Navbar
        </NavLink>

        <button className="navbar-toggler" type="button" onClick={toggle}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={"collapse navbar-collapse" + (open ? ' show' : '')} >
          <ul className="navbar-nav">


            <li className="nav-item">
              <NavLink className="nav-link" to="/playlists">Playlists</NavLink>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="#/search">Search</a> */}
              <NavLink className="nav-link" to="/search">Search</NavLink>
            </li>
          </ul>

          <div className="ml-auto text-white">
            <UserProfile />
          </div>

        </div>
      </div>
    </nav>
  )
}
