import { useContext } from 'react'
import UserContext from '../context/UserContext'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import styled from 'styled-components'

export default function Sidebar() {

  const user = useContext(UserContext)

  return (
    <Wrapper>
      <h1>🌱 Sencha</h1>
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
  background-color: rgb(16, 24, 39);
  color: rgb(255, 255, 255);
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 100%;
  min-width: 250px;
  // padding-left: 24px;
  text-align: center;

  @media all and (min-width: 600px) {
    text-align: left;
    flex: 0 0;
  }

  h1 {
    margin: 24px 0;
    padding: 0 0 0 12px;
  }

`

const Nav = styled.nav`

  li a,
  ul {
    margin-left: 0;
    padding-left: 0;
    list-style: none;
    position: relative;
    padding: 6px;
    display: block;
    width: 100%;
  }

  a {
    color: rgb(255, 255, 255);
    text-decoration: none;
  }

  li {
    border-radius: 6px;
    padding: 6px;
    border: 3px solid transparent;
    transition: all .3s;
  }

  li:hover {
    background-color: hsl(122, 64%, 30%);
  }

`
