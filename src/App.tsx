import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import { SearchContainer } from './search/SearchPage'
import { Header } from './page/Header'
import { About } from './about/About'

export const App = (): JSX.Element => {

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/about">
          <About />
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