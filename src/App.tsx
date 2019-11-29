import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import { SearchContainer } from './search/SearchPage'
import { DetailContainer } from './movieDetail/DetailPage'
import { Header } from './page/Header'
import { About } from './about/About'
import GlobalStyle from './styles/baseStyle'

export const App = (): JSX.Element => {

  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/detail/:id" component={DetailContainer}>
        </Route>
        <Route path="/play-later">
          <div>play later</div>
        </Route>
        <Route path="/">
          <SearchContainer />
        </Route>
      </Switch>
    </Router>
  )
}
export default App