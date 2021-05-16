import React from 'react'
import styled, { keyframes } from 'styled-components'

const slide = keyframes`
    0% {
        transform:translateX(-25%);
    }
    100% {
        transform:translateX(25%);
    }
`

const Background1 = styled.div`
  animation:${slide} 8s ease-in-out infinite alternate;
  background-image: linear-gradient(-60deg, #6c3 50%, #09f 50%);
  bottom:0;
  left:-50%;
  opacity:.5;
  position:fixed;
  right:-50%;
  top:0;
  z-index:-1;
`

const Background2 = styled(Background1)`
  animation-direction:alternate-reverse;
  animation-duration:9s;
`

const Background3 = styled(Background1)`
  animation-duration:10s;
`

const Background = ({ children }) => (
    <>
        <Background1 />
        <Background2 />
        <Background3 />
        {children}
    </>
)

export default Background
