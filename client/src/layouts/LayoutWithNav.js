import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Sidebar from '../components/Sidebar'
// import Footer from '../components/Footer'

export default function LayoutsWithNav() {
  return (
    <>
      <Wrapper>
        <Sidebar />
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
