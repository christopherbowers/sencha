import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Client from '../services/api'
// import UserContext from '../context/UserContext'
import styled from 'styled-components'

export default function Tickets({id}) {

  const navigate = useNavigate()
  const token = localStorage.access_token
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  const getTickets = async () => {
    await Client.get(`/users/${id}/tickets/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setTickets(res.data.tickets)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (id) {
      getTickets()
    }
  },[])



  if (loading) {
    return <>Loading...</>
  }

  return (
    <>
      {tickets.map(ticket => {

        const { id, title, priority } = ticket

        return (
        <Wrapper key={id} onClick={() => navigate(`/tickets/${ id }`)}>
          <Link to={(`/tickets/${ id }`)}>ID: { id }</Link>
          <p><strong>Title:</strong> { title }</p>
          <p className={priority.name}>Priority: { priority.name }</p>
{/*           <Link to={(`/tickets/${ id }`)}>View</Link> */}
        </Wrapper>
        )

      })}
    </>
  )
}


const Wrapper = styled.div`
  border: 1px solid black;
  margin-bottom: 20px;

  text-align: left;
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  justify-content: space-around;
  transition: all .2s;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }

  .Normal {
    color: orange;
  }
  .High {
    color: red;
  }
  .Low {
    color: green;
  }
`






