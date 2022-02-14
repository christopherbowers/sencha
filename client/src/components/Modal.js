import styled from 'styled-components'

export default function Modal({ open, children }) {

  if (!open) {
    return (null)
  }

  return (
    <Overlay>
      <Wrapper>
        { children }
      </Wrapper>
    </Overlay>
  )
}


const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
`

const Overlay = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: hsl(0, 0%, 0%, .5);
`
