import React from 'react'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import { DetailPage } from './DetailPage'

storiesOf('Movie Detail', module).add('default', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)
  const mockState = {
    favourites: {
      data: [],
    },
    currentMovie: {
      isLoading: false,
      data: {
        id: '1',
        original_title: 'movie 1',
        overview: 'movie about a thing',
        release_date: '2004-10-20',
      },
    },
  }
  const reduxStore = mockStore(mockState)
  const props = {
    match: {
      params: {
        id: 1,
      },
    },
  }
  return (
    <Provider store={reduxStore}>
      <DetailPage {...props} />
    </Provider>
  )
})
