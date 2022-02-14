import Client from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function DeleteTicket({ id }) {

  const navigate = useNavigate()
  const closeTicket = async () => {
    Client.patch(`tickets/admin/${ id }/`,{
      status: 'closed'
    })
      .then(navigate(-1))
  }

  return (
    <button onClick={ closeTicket }>Close</button>
  )
}
