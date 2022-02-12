import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api'
import UserContext from '../context/UserContext'


export default function NewTicket() {

  const global = useContext(UserContext)
  const navigate = useNavigate()
  const [priority, setPriority] = useState(1)
  const handleChange = (e) => {
    setPriority({[e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await Client.post(`/tickets/create/`, {
      created_by: global.id,
      title: e.target.title.value,
      description: e.target.description.value,
      priority: priority,
      status: 'open',
    })
      .then((res) => navigate('/'))
      .catch(error => alert('There was an error'))
  }


  return (
    <>
      <h2>Create Ticket</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title</label>
        <input type='text' name='title' required />

        <label htmlFor='description'>Description</label>
        <textarea type='text' name='description' required />

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
