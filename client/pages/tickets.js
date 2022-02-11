import { useContext, useEffect, useState } from 'react'
import Client from '../services/api'
import GlobalContext from '../utils/global-context'


export default function Tickets() {

  const global = useContext(GlobalContext)

  if (typeof window !== 'undefined') {
    const token = localStorage.access_token
  }

  const [tickets, setTickets] = useState([])


const getTickets = async () => {
  const id = global.id
  await Client.get(`/users/${id}/tickets/`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then((res) => {
    console.log(res.data.tickets)
  })
}

useEffect(() => {

  if (token) {
    getTickets()
  }

},[])



  return (
    <><h1>Tickets</h1>

    {tickets.map(ticket => {

      const { id, title, description } = ticket

      return (
      <div key={id}>
        <p>{title}</p>
        <p>{description}</p>
      </div>
    )
  })}


    </>
  )
}








