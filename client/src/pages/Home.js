import { lazy, useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'
import Client from '../services/api'
const Tickets = lazy(() => import('../components/Tickets'))

export default function Home() {

  const global = useContext(UserContext)

    const getUser = async () => {
      const token = localStorage.access_token
      await Client.get(`/users/me/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((res) => {
          global.update({
            id: res.data.id,
            userName: res.data.user_name,
            firstName: res.data.first_name,
            lastName: res.data.last_name,
            email: res.data.email,
          })
          localStorage.setItem('id', res.data.id)
        })
    }


    useEffect(() => {
      const token = localStorage.access_token
      if (token) {
        getUser()
      }
    },[])



  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          👋 Welcome { global.firstName }
        </h1>
        <Tickets id={ global.id }/ >
      </main>
    </div>
  )
}
