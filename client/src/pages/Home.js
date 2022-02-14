import { lazy, useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'
import Client from '../services/api'
import styled from 'styled-components'
const Tickets = lazy(() => import('../components/Tickets'))
const AllTickets = lazy(() => import('../components/AllTickets'))

export default function Home() {

  const user = useContext(UserContext)

  const getUser = async () => {
    const token = localStorage.access_token
    await Client.get(`/users/${user.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      user.update({
        id: res.data.id,
        userName: res.data.user_name,
        firstName: res.data.first_name,
        lastName: res.data.last_name,
        email: res.data.email,
        is_superuser: res.data.is_superuser
      })
    })
  }


  useEffect(() => {
    if (user.id) {
      getUser()
    }
  },[])


  return (
    <>
    <Wrapper>
        { user.is_superuser ?
          (<AllTickets id={ user.id }/ >)
          :
          (<Tickets id={ user.id }/ >)
        }
    </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  flex-grow: 1;
  flex-basis: 100%;
  flex: 1;
  padding: 24px;
  background-color: hsl(0, 0%, 90%);

  @media all and (min-width: 600px) {
    flex: 3 0px;
  }
`
