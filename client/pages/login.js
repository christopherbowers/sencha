import { useRouter } from 'next/router'
import Link from 'next/link'
import Client from '../services/api'

export default function Login() {
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await Client.post(`${process.env.NEXT_PUBLIC_API_URL}/token/`, {
      email: e.target.email.value,
      password:  e.target.password.value
    }).then((res) => {
      localStorage.setItem('access_token', res.data.access)
      localStorage.setItem('refresh_token', res.data.refresh)
      Client.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token')
      router.push('/')
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
        <Link href="register">
          <a>Don&apos;t have an account? Sign Up.</a>
        </Link>
      </div>
    </>
  )
}
