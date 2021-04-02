import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 20px;
`

export const Header = () => (
  <HeaderContainer>
    <div>
      <Link to="/">search</Link>
    </div>
    <div>
      <Link to="/favourites">my favourites</Link>
      <span> | </span>
      <Link to="/watch-later">watch later</Link>
      <span> | </span>
      <Link to="/about">about</Link>
    </div>
  </HeaderContainer>
)
