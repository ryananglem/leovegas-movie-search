import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { SearchContainer } from './search/SearchPage'
import { DetailContainer } from './movieDetail/DetailPage'
import { WatchLaterContainer } from './watchLater/WatchLaterPage'
import { FavouritesPage } from './favourites/FavouritesPage'
import { AuthorisationContainer } from './authorisation/AuthorisationContainer'
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
        <Route path="/detail/:id" component={DetailContainer}></Route>
        <Route path="/favourites">
          <FavouritesPage />
        </Route>
        <Route path="/watch-later">
          <WatchLaterContainer />
        </Route>
        <Route path="/auth-approved" component={AuthorisationContainer}></Route>
        <Route path="/">
          <SearchContainer />
        </Route>
      </Switch>
    </Router>
  )
}
export default App
