import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import Client from '../services/api'

export default function Logout() {

    const navigate = useNavigate()

    const user = useContext(UserContext)

    const logout = async () => {
      await Client.post('/users/logout/blacklist/', {
          refresh_token: localStorage.getItem('refresh_token'),
      })
      .then(() => {
        user.update({
          id: null,
          userName: '',
          firstName: '',
          lastName: '',
          email: '',
          is_superuser: ''
        })
        localStorage.clear()
        Client.defaults.headers['Authorization'] = null
        navigate('/login')
      })
    }


    return (
      <li>
        <Link to="#" onClick={logout}>
          Logout
        </Link>
      </li>
    )
}
