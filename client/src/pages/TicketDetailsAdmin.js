import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Client from '../services/api'
import DeleteTicket from '../components/DeleteTicket'
import CloseTicket from '../components/CloseTicket'
import styled from 'styled-components'

export default function TicketDetail() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [ticket, setTicket] = useState({})

  const getTicketDetails = async () =>  {
    await Client.get(`/tickets/admin/${ id }/`)
      .then((res) => {
        setTicket(res.data)
      })
  }

  const timestamp = Date.parse(ticket.created_at)
  const createdOn = new Date(timestamp).toLocaleDateString('en-us', { weekday:'long', year:'numeric', month:'long', day:'numeric'})

  useEffect(() => {
    getTicketDetails()
  },[id])

  return (
    <Wrapper>
    <h1>{ ticket.title }</h1>
    <p>{ ticket.priority }</p>
    <p>{ ticket.description }</p>
    <p>Created On: { createdOn }</p>
    <p>{ ticket.status }</p>
    <button onClick={() => navigate(`/tickets/${ id }/edit`)}>
      Edit
    </button>
    <DeleteTicket id={ id } />
    <CloseTicket id={ id } getTicketDetails={getTicketDetails}/>
    </Wrapper>
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
