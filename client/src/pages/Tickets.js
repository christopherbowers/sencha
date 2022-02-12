import { useContext, useEffect, useState } from 'react'
import Client from '../services/api'
import UserContext from '../context/UserContext'
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
      console.log(res.data.tickets)
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

      const { id, title, description } = ticket

      return (
      <Wrapper key={id}>
        <p><strong>{title}</strong></p>
        <p>{description}</p>
      </Wrapper>
      )
    })}
    </>
  )
}


const Wrapper = styled.div`
  border: 1px solid black;
  margin-bottom: 20px;
`






