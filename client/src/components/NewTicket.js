import { useContext, useState } from 'react'
import Client from '../services/api'
import Button from './Button'
import UserContext from '../context/UserContext'
import { COLORS } from '../constants'
import styled from 'styled-components'



export default function NewTicket({ onClose }) {

  const global = useContext(UserContext)
  // const navigate = useNavigate()
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
      .then( onClose() )
      .catch(error => alert('There was an', error))
  }


  return (
    <Wrapper>
      <h2>New Ticket</h2>

      <Form onSubmit={handleSubmit}>
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
        <Button text={'Submit'} type="submit" />
        <CloseButton onClick={onClose}>Cancel</CloseButton>
      </Form>

    </Wrapper>
  )
}


const Wrapper = styled.div`
  Background: white;
  color: ${COLORS.navy};
  padding: 24px;
  border-radius: 12px;

`

const Form = styled.form`
  tex-align: left;
  display: flex;
  flex-flow: column nowrap;
`

const CloseButton = styled.button`
  display: inline-block;
  border-radius: 6px;
  padding: 0.5rem 0;
  margin: 0.5rem 3rem;
  border: none;
  cursor: pointer;
  transition: .2s;

  color: ${COLORS.textLight};
  background-color: ${COLORS.navy};

  &:hover {
    background: ${COLORS.navyHover}
  }
`
