import React from 'react';
import { storiesOf } from '@storybook/react'
import {SearchResults} from './SearchResults';

storiesOf('Search Results', module)
  .add('default', () => {
    const props = { results: [{
        original_title: 'movie 1'
    },{
        original_title: 'movie 2'
    }]}

    return <SearchResults {...props} />
  })