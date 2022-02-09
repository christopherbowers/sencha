import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'

export default function Login() {
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/token/`, {
      email: e.target.email.value,
      password:  e.target.password.value
    }).then((res) => {
      localStorage.setItem('access_token', res.data.access)
      localStorage.setItem('refresh_token', res.data.refresh)
      router.push('/')
    })
  }


  return (
    <>
      <h1>Register</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <lable htmlFor="email">Email</lable>
          <input type="text" name="email" required />
          <lable htmlFor="password">Password</lable>
          <input type="password" name="password" required />
          <button type="submit">Login</button>
        </form>
      </div>
      <div>
        <Link href="register">
          <a>Don't have an account? Sign Up.</a>
        </Link>
      </div>
    </>
  )
}
