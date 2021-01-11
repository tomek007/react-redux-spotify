import React, { FC, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin, userLogout } from '../../reducers/userReducer'
import { UserContext } from './UserContext'

export const UserProfile: FC = (props) => {
  const { user } = useSelector((state: any) => state.user)
  const dispatch = useDispatch()

  const login = () => {
    // userLogin()(dispatch) // use Thunk instead!
    dispatch(userLogin())
  }
  const logout = () => {
    dispatch(userLogout())
  }

  return (
    <div>
      {user && <span>Welcome {user.display_name},
        <a onClick={logout}> Logout</a>
      </span>}

      {!user && <span>Welcome Anonym,
        <a onClick={login}> Login</a>
      </span>}
    </div>
  )
}
