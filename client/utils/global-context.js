import React from 'react'

const GlobalContext = React.createContext({
  id: null,
  userName: '',
  firstName: '',
  lastName: '',
  email: '',
  update: (data) => {}
})

export default GlobalContext
