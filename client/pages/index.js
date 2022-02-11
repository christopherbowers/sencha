import Head from 'next/head'
import { useContext, useEffect } from 'react'
import GlobalContext from '../utils/global-context'
import Client from '../services/api'

export default function Home() {

  const global = useContext(GlobalContext)

    const getUser = async () => {
      // const token = localStorage.access_token
      await Client.get(`/users/me/`)
        .then((res) => {
          global.update({
            id: res.data.id,
            userName: res.data.user_name,
            firstName: res.data.first_name,
            lastName: res.data.last_name,
            email: res.data.email,
          })
          // console.log(res)
        })
    }


    useEffect(() => {
      const token = localStorage.access_token
      if (token) {
        getUser()
      }
    },[])
        // console.log(global)



  return (
    <div className="container">
      <Head>
        <title>Sencha</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">
          👋 Welcome {global.firstName}
        </h1>
      </main>
    </div>
  )
}
