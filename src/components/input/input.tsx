import React, { FC } from 'react'
import styled from 'styled-components'

interface IInputProps {
    id: string,
    label?: string,
    [x: string]: any
}

const StyledInput = styled.input`
  padding: 0.5em;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  min-width: 300px;
  ::-webkit-inner-spin-button{
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button{
    -webkit-appearance: none;
    margin: 0;
  }
`

const StyledLabel = styled.label`
  position: relative;
  display: inline-block;
  font-size: 24px;
  text-align: left;
`

const StyledP = styled.p`
  margin: 0;
  font-size: 1.1rem;
  color: darkgray;
`

const Input: FC<IInputProps> = ({
    id,
    label,
    ...rest
}) => (
    <StyledLabel
        htmlFor={id}
    >
        <StyledP>
            {label}
        </StyledP>
        <StyledInput
            {...rest}
        />
    </StyledLabel>
)

export default Input
