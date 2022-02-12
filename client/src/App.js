import { Suspense, lazy, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import UserContext from './context/UserContext'

const LayoutWithNav = lazy(() => import( './layouts/LayoutWithNav'))
const LayoutWithoutNav = lazy(() => import( './layouts/LayoutWithoutNav'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const NewTicket = lazy(() => import('./components/NewTicket'))
const Tickets = lazy(() => import('./pages/Tickets'))
const TicketDetails = lazy(() => import('./pages/TicketDetails'))



function App() {

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
    <UserContext.Provider value={state}>
    <Suspense fallback={<>loading...</>}>
      <Routes>
        <Route path="/" element={ <LayoutWithNav /> } >
          <Route path="/" element={ <Home /> } />
          <Route path="/new-ticket" element={ <NewTicket /> } />
          <Route path="/tickets" element={ <Tickets /> } />
          <Route path="/tickets/:id" element={ <TicketDetails /> } />
        </Route>


        <Route path="/login" element={ <LayoutWithoutNav /> }>
          <Route path="/login" element={ <Login /> } />
        </Route>

        <Route path="/register" element={ <LayoutWithoutNav /> }>
          <Route path="/register" element={ <Register /> } />
        </Route>

      </Routes>
    </Suspense>
    </UserContext.Provider>
  )
}

export default App
