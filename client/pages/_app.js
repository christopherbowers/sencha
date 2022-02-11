import Layout from '../Components/Layout'
import { useState } from 'react'
import GlobalContext from '../utils/global-context'
import '../styles/globals.css'

export default function SenchaApp({ Component, pageProps }) {

  const [state, setState] = useState({
    id: null,
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    update
  })

  function update(data) {
    setState(Object.assign({}, state, data))
  }

  return (
    <GlobalContext.Provider value={state}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalContext.Provider>
  )
}

