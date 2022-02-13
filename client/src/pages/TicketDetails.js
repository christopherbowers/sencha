import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Client from '../services/api'
import DeleteTicket from '../components/DeleteTicket'

export default function TicketDetail() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [ticket, setTicket] = useState({})

  const getTicketDetails = async () =>  {
    await Client.get(`/tickets/${ id }`)
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
    <>
    <h1>{ ticket.title }</h1>
    <p>{ ticket.priority }</p>
    <p>{ ticket.description }</p>
    <p>Created On: { createdOn }</p>
    <button onClick={() => navigate(`/tickets/${ id }/edit`)}>
      Edit
    </button>
    <DeleteTicket id={ id } />
    </>
  )
}
