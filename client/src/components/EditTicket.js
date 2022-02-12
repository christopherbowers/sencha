import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Client from '../services/api'
import UserContext from '../context/UserContext'

export default function EditTicket() {

  const navigate = useNavigate()
  const global = useContext(UserContext)
  const { id } = useParams()

  const [ticket, setTicket] = useState({})
  const [priority, setPriority] = useState(null)


  const getTicketDetails = async () =>  {
    await Client.get(`/tickets/${ id }`)
      .then((res) => {
        setTicket(res.data)
        if (res.data.priority === 'Normal') {
          setPriority(1)
        } else if (res.data.priority === 'High') {
            setPriority(2)
        } else if (res.data.priority === 'Low') {
            setPriority(3)
        }
      })
  }

  const handleSubmit = async (e) =>  {
    e.preventDefault()
    await Client.put(`/tickets/${ id }/`,{
      created_by: global.id,
      title: e.target.title.value,
      description: e.target.description.value,
      priority: priority,
      status: 'open',
     })
      .then((res) => { navigate(-1)})
  }



    const handleChange = (e) => {
      setPriority({[e.target.name]: e.target.value})
    }

    useEffect(() => {
      getTicketDetails()
    },[id])

    console.log(ticket)

  return (
    <>
    <h1>Edit</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor='title'>Title</label>
      <input type='text' name='title' defaultValue={ ticket.title } />

      <label htmlFor='description'>Description</label>
      <textarea type='text' name='description' defaultValue={ ticket.description } />

      <label htmlFor="priority">Priority:</label>
      <select name="priority" onChange={handleChange}>
        <option value="1">Normal</option>
        <option value="2">High</option>
        <option value="3">Low</option>
      </select>
      <button type='submit'>Submit</button>
    </form>
    </>
  )
}
