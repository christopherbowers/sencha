import React from 'react'

const UserContext = React.createContext({
  id: null,
  userName: '',
  firstName: '',
  lastName: '',
  email: '',
  update: (data) => {}
})

export default UserContext
