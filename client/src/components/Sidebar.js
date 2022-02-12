import { Link, useNavigate } from 'react-router-dom'
import Client from '../services/api'
import styled from 'styled-components'

export default function Sidebar() {
  const navigate = useNavigate()

  const logout = async () => {
    await Client.post('/users/logout/blacklist/', {
      refresh_token: localStorage.getItem('refresh_token'),
    })
    localStorage.clear()
    Client.defaults.headers['Authorization'] = null
    navigate('/login')
  }

  const token = localStorage.access_token

  return (
    <section>
      <Nav>
        <Link to="/new-ticket">
          New Ticket
        </Link>
        <Link to="/">
          Dashboard
        </Link>
        { !token ?
        <Link to="/login">
          Login
        </Link>
        :
        <Link to="#" onClick={logout}>
          Logout
        </Link>
        }
      </Nav>
    </section>
  )
}


const Nav = styled.nav`

  padding-top: 10px;
  margin: 10px;


  a {
    color: hsl(122, 64%, 30%);
    background-color: hsl(122, 64%, 77%);
    padding: 6px 10px;
    margin: 0 10px;
    border-radius: 6px;
    border: 3px solid transparent;
    transition: all .3s;
    transition-timing-function: ease-in-out;
    text-decoration: none;
  }

  a:hover {
    border: 3px solid hsl(122, 64%, 30%);
  }

`
