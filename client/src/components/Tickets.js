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
    <Wrapper>
      {tickets.map(ticket => {
        const { id, title, priority, status } = ticket
        return (
        <Ticket key={id} onClick={() => navigate(`/tickets/${ id }`)}>
          <div><Link to={(`/tickets/${ id }`)}>ID: { id }</Link></div>
          <div><p><strong>Title:</strong> { title }</p></div>
          <div><p className={priority.name}>{ priority.name }</p></div>
          <div><p className="status">{ status }</p></div>
        </Ticket>
        )
      })}
    </Wrapper>
  )
}


const Wrapper = styled.div`
  background-color: rgb(255, 255, 255);
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

`

const Ticket = styled.div`

  &:first-child {
    border: 0;
  }

  border-top: 1px solid hsl(0, 0%, 80%);

  // margin-bottom: 10px;

  text-align: left;
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  justify-content: space-around;
  transition: all .2s;
  cursor: pointer;

  &:hover {
    background-color: hsl(0, 0%, 97%);
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

  .status { text-transform: capitalize;
`






