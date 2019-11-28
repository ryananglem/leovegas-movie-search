import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import { SearchContainer } from './search/SearchPage'
import { Header } from './page/Header'

export const App = (): JSX.Element => {

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/about">
          <div>about this app</div>
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