import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
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
        if(res.status === 201) {
          navigate('/')
        }
      })
  }

  return (
    <>
      <Wrapper>
      <h2>Register</h2>
        <Form onSubmit={handleSubmit}>
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
          <Button text={'Register'} />
        </Form>
      </Wrapper>
      <div>
        <Link to='/'>
          Already have an account? Log in.
        </Link>
      </div>
    </>
  )
}

const Wrapper = styled.div`
  text-align: left;
`


const Form = styled.form`
  input {
    margin-bottom: 10px;
  }

  tex-align: left;
  display: flex;
  flex-flow: column nowrap;
`
