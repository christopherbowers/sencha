import { useContext } from 'react'
import UserContext from '../context/UserContext'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import styled from 'styled-components'

export default function Sidebar() {

  const user = useContext(UserContext)

  return (
    <Wrapper>
      <Nav>
      <ul>
        <li>
          <Link to="/new-ticket">
            New Ticket
          </Link>
        </li>
        <li>
          <Link to="/">
            Dashboard
          </Link>
        </li>
        {
          user ? <Logout /> :
          <li>
          <Link to="/login">
            Login
          </Link>
          </li>
        }
        </ul>
      </Nav>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 100%;
  min-width: 200px;
  background-color: navy;

  @media all and (min-width: 600px) {
    flex: 0 0;
  }


`

const Nav = styled.nav`

  li,
  ul {
    margin-left: 0;
    padding-left: 0;
    list-style: none;
  }

  a {
    color: hsl(122, 64%, 30%);
    background-color: hsl(122, 64%, 77%);
    // padding: 6px 10px;
    // margin: 0 10px;
    border-radius: 6px;
    border: 3px solid transparent;
    transition: all .3s;
    text-decoration: none;
  }

  a:hover {
    border: 3px solid hsl(122, 64%, 30%);
  }

`
