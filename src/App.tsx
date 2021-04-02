import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { SearchContainer } from './search/SearchPage'
import { DetailContainer } from './movieDetail/DetailPage'
import { WatchLaterPage } from './watchLater/WatchLaterPage'
import { FavouritesPage } from './favourites/FavouritesPage'
import { AuthorisationContainer } from './authorisation/AuthorisationContainer'
import { AuthFailedPage } from './authorisation/AuthFailedPage'

import { Header } from './page/Header'
import { About } from './about/About'

import GlobalStyle from './styles/baseStyle'
import { deniedAuthSelector } from './authorisation/authorisation.redux'

export const App = (): JSX.Element => {
  useEffect(() => {
    if (localStorage.getItem('refreshToken') !== null) {
      localStorage.removeItem('refreshToken')
    }
  })
  const deniedAuth = useSelector(deniedAuthSelector)

  return (
    <Router>
      <GlobalStyle />
      {!deniedAuth && <Header />}
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/detail/:id" component={DetailContainer}></Route>
        <Route path="/favourites">
          <FavouritesPage />
        </Route>
        <Route path="/watch-later">
          <WatchLaterPage />
        </Route>
        <Route path="/auth-failed" component={AuthFailedPage}></Route>
        <Route path="/auth-approved" component={AuthorisationContainer}></Route>
        <Route path="/">
          <SearchContainer />
        </Route>
      </Switch>
    </Router>
  )
}
export default App
