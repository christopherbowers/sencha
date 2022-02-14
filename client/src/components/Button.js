import styled from 'styled-components'
import { COLORS } from '../constants'

export default function ButtonSubmit({ text, type }) {
  return (
    <Button type={ type }>{ text }</Button>
  )
}

const Button = styled.button`
  display: inline-block;
  border-radius: 6px;
  padding: 0.5rem 0;
  margin: 0.5rem 3rem;
  border: none;
  cursor: pointer;
  transition: .2s;

  color: ${COLORS.textLight};
  background-color: ${COLORS.navy};

  &:hover {
    background: ${COLORS.navyHover}
  }
`
