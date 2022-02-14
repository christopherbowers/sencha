import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Client from '../services/api'
import styled from 'styled-components'

export default function AllTickets({id}) {

  const navigate = useNavigate()


  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  const getTickets = async () => {
    await Client.get(`/tickets/`)
    .then((res) => {
      setTickets(res.data)
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
        <Ticket key={id} onClick={() => navigate(`/tickets/admin/${ id }`)}>
          <Link className="id" to={(`/tickets/admin/${ id }`)}>ID: { id }</Link>
          <p className="title"><strong>Title:</strong> { title }</p>
          <div className="priority"><p className={priority}>{ priority }</p></div>
          <p className="status">{ status }</p>
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

  padding: 0 12px;

  text-align: left;
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  justify-content: space-around;
  transition: all .2s;
  cursor: pointer;

  .title {
    flex-grow: 4;
  }

  .id {
    min-width: 100px;
    max-width: 100px;
    flex-grow: 1;

  }

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

  .priority p {
   padding: 3px 6px;
   margin: 10px;
   border-radius: 16px;
   flex-grow: 0;
   text-align: center;
   align-items: center;
  }

  .priority {
     min-width: 100px;
     max-width: 100px;
   }

  .status {
    text-transform: capitalize;
    flex-grow: 0;
  }

`





