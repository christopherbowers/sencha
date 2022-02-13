import { lazy, useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'
import Client from '../services/api'
const Tickets = lazy(() => import('../components/Tickets'))
const AllTickets = lazy(() => import('../components/AllTickets'))

export default function Home() {

  const user = useContext(UserContext)

  const getUser = async () => {
    const token = localStorage.access_token
    await Client.get(`/users/${user.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      console.log(res.data)
      user.update({
        id: res.data.id,
        userName: res.data.user_name,
        firstName: res.data.first_name,
        lastName: res.data.last_name,
        email: res.data.email,
        is_superuser: res.data.is_superuser
      })
    })
  }


  useEffect(() => {
    if (user.id) {
      getUser()
    }
  },[])


  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          👋 Welcome { user.firstName }
        </h1>
        { user.is_superuser ?
          (<AllTickets id={ user.id }/ >)
          :
          (<Tickets id={ user.id }/ >)
        }
      </main>
    </div>
  )
}
