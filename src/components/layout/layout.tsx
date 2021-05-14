import React, { FC } from 'react'
import styled from 'styled-components'

interface ILayoutProps {
    title?: string
}

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: black;
`

const Wrapper = styled.div`
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`

const Layout: FC<ILayoutProps> = ({ title, children }) => (
    <Wrapper>
        <Title>
            {title}
        </Title>
        {children}
    </Wrapper>
)

export default Layout
