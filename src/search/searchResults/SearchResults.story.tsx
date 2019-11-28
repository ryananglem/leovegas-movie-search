import React from 'react';
import { storiesOf } from '@storybook/react'
import {SearchResults} from './SearchResults';

storiesOf('Search Results', module)
  .add('default', () => {
    const props = { 
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