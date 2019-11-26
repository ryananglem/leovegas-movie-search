import React from 'react';
import { storiesOf } from '@storybook/react'
import {SearchResults} from './SearchResults';

storiesOf('Search Results', module)
  .add('default', () => {
    const props = { results: [{
        original_title: 'movie 1',
        overview: 'movie about a thing'
    },{
        original_title: 'movie 2',
        overview: 'another movie about a thing'
    }]}

    return <SearchResults {...props} />
  })