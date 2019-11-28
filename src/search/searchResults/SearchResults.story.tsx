import React from 'react';
import { storiesOf } from '@storybook/react'
import {SearchResults} from './SearchResults';
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
        overview: 'movie about a thing'
    },{
        id: '2',
        original_title: 'movie 2',
        overview: 'another movie about a thing'
    }]}

    return <SearchResults {...props} />
  })