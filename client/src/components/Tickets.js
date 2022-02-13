import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Client from '../services/api'

import styled from 'styled-components'

export default function Tickets({id}) {

  const navigate = useNavigate()

  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  const getTickets = async () => {
    await Client.get(`/users/${id}/tickets/`)
    .then((res) => {
      setTickets(res.data.tickets)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (id) {
      getTickets()
    }
  },[id])


  if (loading) {
    return <>Loading...</>
  }

  return (
    <>
      {tickets.map(ticket => {
        const { id, title, priority, status } = ticket
        return (
        <Wrapper key={id} onClick={() => navigate(`/tickets/${ id }`)}>
          <Link to={(`/tickets/${ id }`)}>ID: { id }</Link>
          <p><strong>Title:</strong> { title }</p>
          <p className={priority.name}>{ priority.name }</p>
          <p className="status">{ status }</p>
        </Wrapper>
        )
      })}
    </>
  )
}


const Wrapper = styled.div`
  border: 1px solid black;
  margin-bottom: 10px;

  text-align: left;
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  justify-content: space-around;
  transition: all .2s;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }

  .Normal {
    color: hsl(52, 100%, 20%);
    background-color: hsl(52, 100%, 70%);
  }
  .High {
    color: hsl(0, 100%, 10%);
    background-color: hsl(0, 100%, 65%);
  }
  .Low {
    color: hsl(123, 100%, 10%);
    background-color: hsl(123, 50%, 50%);
  }

  .Normal,
  .High,
  .Low {
   padding: 8px 12px 6px 12px;
   border-radius: 16px;
  }
`






