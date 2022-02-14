import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Sidebar from '../components/Sidebar'


export default function LayoutsWithNav({toggleAuthenticated}) {
  return (
    <>
      <Wrapper>
        <Sidebar toggleAuthenticated={ toggleAuthenticated } />
        <Outlet />
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  min-height: 100vh;
`
