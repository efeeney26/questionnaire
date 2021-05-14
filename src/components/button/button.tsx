import styled from 'styled-components'

const Button = styled.button`
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid green;
  border-radius: 3px;
  background-color: green;
  :disabled {
    background-color: grey;
  }
`

export default Button
