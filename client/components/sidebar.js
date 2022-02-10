import Link from 'next/link'
import Client from '../services/api'
import { useRouter } from 'next/router'

export default function Sidebar() {
  const router = useRouter()

  const logout = async () => {
    await Client.post('/users/logout/blacklist/', {
      refresh_token: localStorage.getItem('refresh_token'),
    })
    localStorage.clear()
    Client.defaults.headers['Authorization'] = null
    router.push('/login')
  }

  return (
    <section>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <Link href="#" >
          <a onClick={logout}>Logout</a>
        </Link>
      </nav>
    </section>
  )
}
