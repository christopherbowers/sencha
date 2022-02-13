import { Link } from 'react-router-dom'
import Logout from './Logout'
import styled from 'styled-components'

export default function Sidebar() {

  return (
    <section>
      <Nav>
        <Link to="/new-ticket">
          New Ticket
        </Link>
        <Link to="/">
          Dashboard
        </Link>
        <Logout />
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
