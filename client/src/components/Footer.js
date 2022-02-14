import styled from 'styled-components'

export default function Footer() {
  return (
    <Wrapper>
      <p>Built with Next.js and Django by Christopher Bowers. Source code on <a href="https://github.com/christopherbowers/sencha" target="blank">github</a></p>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  flex-grow: 1;
  flex-basis: 100%;
  text-align: center;

`
