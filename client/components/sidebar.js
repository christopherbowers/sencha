import Link from 'next/link'
import Client from '../services/api'
import { useRouter } from 'next/router'
import styled from 'styled-components'

export default function Sidebar() {
  const router = useRouter()

  const logout = async () => {
    await Client.post('/users/logout/blacklist/', {
      refresh_token: localStorage.getItem('refresh_token'),
    })
    localStorage.clear()
    Client.defaults.headers['Authorization'] = null
    router.push('/login')
  }

  return (
    <section>
      <Nav>
        <Link href="/new-ticket">
          <a>New Ticket</a>
        </Link>
        <Link href="/tickets">
          <a>Tickets</a>
        </Link>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <Link href="#" >
          <a onClick={logout}>Logout</a>
        </Link>
      </Nav>
    </section>
  )
}


const Nav = styled.nav`

  padding-top: 10px;
  margin: 10px;

  a {
    background-color: hsl(122, 64%, 77%);
    padding: 6px 10px;
    margin: 0 10px;
    border-radius: 6px;
    border: 3px solid transparent;
    transition: all .3s;
    transition-timing-function: ease-in-out;
  }

  a:hover {
    border: 3px solid hsl(122, 64%, 30%);
  }

`
