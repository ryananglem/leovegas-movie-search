import React from 'react';
import { storiesOf } from '@storybook/react'
import {List} from './List';
import {Item} from './Item';

storiesOf('Movie List', module)
  .add('list', () => {
    const props = { 
      movieList: [{
        original_title: 'movie 1',
        overview: 'movie about a thing'
    },{
        original_title: 'movie 2',
        overview: 'another movie about a thing'
    }]
    }

    return <List {...props} />
  })
  .add('item', () => {
    const props = { 
      movie: {
        original_title: 'movie 1',
        overview: 'movie about a thing'
    }}

    return <Item {...props} />
  })