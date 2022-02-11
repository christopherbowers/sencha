import { useContext, useState } from 'react'
import Client from '../services/api'
import GlobalContext from '../utils/global-context'


export default function NewTicket() {

  const global = useContext(GlobalContext)

  const initialFormData = {
    title: '',
    description: '',
    priority: 1
  }

  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.access_token
    console.log(token)
    await Client.post(`/tickets/create/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      created_by: global.id,
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: 'open',
    })
      .then((res) => alert('Ticket Added'))
      .catch(error => alert('There was an error'))
  }


  return (
    <>
      <h2>Create Ticket</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title</label>
        <input type='text' name='title' required onChange={handleChange} />

        <label htmlFor='description'>Description</label>
        <textarea type='text' name='description' required onChange={handleChange} />

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
