import React, { FC, useState } from "react";

interface User {
  name: string
}

type ContextType = {
  user: User | null;
  login(): void;
  logout(): void;
};

export const UserContext = React.createContext<ContextType>({
  user: null,
  login: (): void => { throw new Error('Missing User Context') },
  logout: () => { },
})



export const UserContextProvider: FC = (props) => {
  const [user, setUser] = useState<User | null>(null)

  const login = () => {
    setUser({ name: 'Placki' })
  }
  const logout = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{
      user,
      login,
      logout
    }}>
      {props.children}
    </UserContext.Provider>
  )
}
