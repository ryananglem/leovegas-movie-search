import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import {SearchResults} from './SearchResults';
import { store } from '../../store'
import { action } from '@storybook/addon-actions';

storiesOf('Search Results', module)
  .add('default', () => {
    const props = { 
      isLoading: false,
      getMovie: () => null,
      setFavourite: action('set favourite'),
      term: 'movie',
      results: [{
        id: '1',
        original_title: 'movie 1',
        overview: 'movie about a thing',
        release_date: '2004-01-02'
    },{
        id: '2',
        original_title: 'movie 2',
        overview: 'another movie about a thing',
        release_date: '2004-01-02'
    }]}

    return <Provider store={store}><Router><SearchResults {...props} /></Router></Provider>
  })