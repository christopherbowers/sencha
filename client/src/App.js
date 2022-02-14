import { Suspense, lazy, useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import UserContext from './context/UserContext'
import Client from './services/api'
import parseJwt from './utils/parseJwt'
import { GlobalStyles } from './GlobalStyles'
import Loading from './components/Loading'
const LayoutWithNav = lazy(() => import( './layouts/LayoutWithNav'))
const LayoutWithoutNav = lazy(() => import( './layouts/LayoutWithoutNav'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const NewTicket = lazy(() => import('./components/NewTicket'))
const TicketDetails = lazy(() => import('./pages/TicketDetails'))
const TicketDetailsAdmin = lazy(() => import('./pages/TicketDetailsAdmin'))
const EditTicket = lazy(() => import('./components/EditTicket'))



 export default function App() {

  const [state, setState] = useState({
    id: null,
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    is_superuser: false,
    update
  })

  function update(data) {
    setState(Object.assign({}, state, data))
  }
  const [authenticated, toggleAuthenticated] = useState(false)

  const token = localStorage.access_token

  const checkToken = async () => {
    await Client.post('/token/verify/',{
      token: token
    })
      .then(toggleAuthenticated(true))
      .catch(error =>{
        console.error('Error:', error)
        toggleAuthenticated(false)
      })
  }

  useEffect(() => {
    if (token) {
      checkToken()
      state.id = parseJwt(token).user_id
    }
  },[])


  return (
    <UserContext.Provider value={state}>
    <GlobalStyles />
    <Suspense fallback={<Loading />}>
      <Routes>
        { authenticated ?
          <>
        <Route path="/" element={ <LayoutWithNav toggleAuthenticated={ toggleAuthenticated } /> } >
          <Route path="/" element={ <Home /> } />
          <Route path="/new-ticket" element={ <NewTicket /> } />
          <Route path="/tickets/:id" element={ <TicketDetails /> } />
          <Route path="/tickets/admin/:id" element={ <TicketDetailsAdmin /> } />
          <Route path="/tickets/:id/edit" element={ <EditTicket /> } />
        </Route>
        </>
        :
        <>
        <Route path="/" element={ <LayoutWithoutNav /> }>
          <Route path="/" element={ <Login toggleAuthenticated={ toggleAuthenticated } /> } />
        </Route>

        <Route path="/register" element={ <LayoutWithoutNav /> }>
          <Route path="/register" element={ <Register /> } />
        </Route>
        </>
      }
      </Routes>
    </Suspense>
    </UserContext.Provider>
  )
}
