import Client from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function DeleteTicket({ id }) {

  const navigate = useNavigate()
  const deleteTicket = async () => {
    Client.delete(`tickets/${ id }`)
      .then(navigate('/tickets'))
  }

  return (
    <button onClick={ deleteTicket }>Delete</button>
  )
}
