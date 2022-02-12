import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Client from '../services/api'

export default function Register() {
  const navigate = useNavigate()

  const initialFormData = Object.freeze({
    email: '',
    user_name: '',
    first_name: '',
    last_name: '',
    password: '',
  })

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

    await Client
      .post(`/users/register/`, {
        email: formData.email,
        user_name: formData.user_name,
        first_name: formData.first_name,
        last_name: formData.last_name,
        password: formData.password,
      })
      .then((res) => {
        navigate('/login')
      })
  }

  return (
    <>
      <h1>Register</h1>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input type='text' name='email' required onChange={handleChange} />

          <label htmlFor='user_name'>Username</label>
          <input type='text' name='user_name' required onChange={handleChange} />

          <label htmlFor='first_name'>First Name</label>
          <input type='text' name='first_name' required onChange={handleChange} />

          <label htmlFor='last_name'>Last Name</label>
          <input type='text' name='last_name' required onChange={handleChange} />

          <label htmlFor='password'>Password</label>
          <input type='password' name='password' required onChange={handleChange} />
          <button type='submit'>Register</button>
        </form>
      </FormWrapper>
      <div>
        <Link to='login'>
          Already have an account? Log in.
        </Link>
      </div>
    </>
  )
}

const FormWrapper = styled.div`
  form {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    margin: 0 10px;
  }
`
