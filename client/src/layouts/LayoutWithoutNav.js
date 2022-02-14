import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

export default function LayoutsWithoutNav() {
  return (
    <Wrapper>
      <Logo>
        <h1>🌱 Sencha</h1>
      </Logo>
      <Outlet />
    </Wrapper>
  )
}

const Logo = styled.div`
  font-size: 2rem;
  margin-bottom: 48px;
`

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  height: 100vh;
  margin: 0;
  text-align: left;
`
