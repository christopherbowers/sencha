import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api'

export default function Login() {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await Client.post('/token/', {
      email: e.target.email.value,
      password:  e.target.password.value
    }).then((res) => {
      localStorage.setItem('access_token', res.data.access)
      localStorage.setItem('refresh_token', res.data.refresh)
      Client.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
      navigate('/')
    })
  }


  return (
    <>
      <h1>Log In</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />
          <button type="submit">Login</button>
        </form>
      </div>
      <div>
        <Link to="/register">
          Don't have an account? Sign Up.
        </Link>
      </div>
    </>
  )
}
