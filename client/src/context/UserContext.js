import React from 'react'

const UserContext = React.createContext({
  id: null,
  userName: '',
  firstName: '',
  lastName: '',
  email: '',
  is_superuser: false,
  update: (data) => {}
})

export default UserContext
