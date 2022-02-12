import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Client from '../services/api'
// import UserContext from '../context/UserContext'
import styled from 'styled-components'

export default function Tickets() {

  const token = localStorage.access_token
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)


  const getTickets = async () => {
    const id = localStorage.id

    await Client.get(`/users/${id}/tickets/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setTickets(res.data.tickets)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (token) {
      getTickets()
    }
  },[])



  if (loading) {
    return <>Loading...</>
  }

  return (
    <><h1>Tickets</h1>

    {tickets.map(ticket => {

      const { id, title, priority } = ticket

      return (
      <Wrapper key={id}>
        <Link to={(`/tickets/${ id }`)}>ID: { id }</Link>
        <p><strong>Title:</strong> { title }</p>
        <p className={priority.name}>Priority: { priority.name }</p>
        <Link to={(`/tickets/${ id }`)}>View</Link>
      </Wrapper>
      )

    })}
    </>
  )
}


const Wrapper = styled.div`
  border: 1px solid black;
  margin-bottom: 20px;

  text-align: left;
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  justify-content: space-around;

  // p { margin-right: 10px;

  .Normal {
    color: orange;
  }
  .High {
    color: red;
  }
  .Low {
    color: green;
  }
`






