import React from 'react';
import {  BrowserRouter as Router } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import {List} from './List';
import {Item} from './Item';

storiesOf('Movie List', module)
  .add('list', () => {
    const props = { 
      isLoading: false,
      setFavourite: () => null,
      isSaving: false,
      favourites: [{
        id: '1',
        original_title: 'movie 1',
        overview: 'movie about a thing',
        release_date: '2004-01-02'
      }],
      movieList: [{
        id: '1',
        original_title: 'movie 1',
        overview: 'movie about a thing',
        release_date: '2004-01-02'
    },{
        id: '2',
        original_title: 'movie 2',
        overview: 'another movie about a thing',
        release_date: '2004-01-02'
    }]
    }

    return <Router><List {...props} /></Router>
  })
  .add('item', () => {
    const props = { 
      isFavourite: false,
      setFavourite: () => null,
      setPlayLater: () => null,
      movie: {
        id: '1',
        original_title: 'movie 1',
        overview: 'movie about a thing',
        release_date: '2004-01-02'
    }}

    return <Router><Item {...props} /></Router>
  })
  .add('item with long text', () => {
    const props = { 
      isFavourite: false,
      setFavourite: () => null,
      setPlayLater: () => null,
      movie: {
        id: '1',
        original_title: 'movie 1',
        release_date: '2004-01-02',
        overview: 'Minim in ullamco cillum do mollit eu exercitation. Aliqua eu fugiat non sunt eiusmod sit sit. Officia elit esse aliqua elit amet do nostrud ipsum. Tempor nulla non ex pariatur consectetur dolore sint fugiat reprehenderit enim reprehenderit sit. Reprehenderit excepteur reprehenderit eu irure velit ipsum non cillum minim sit ad reprehenderit laboris. Aute excepteur consequat et esse ullamco labore amet aliquip anim. Occaecat pariatur non excepteur mollit dolore pariatur officia et. Labore fugiat id sit sint adipisicing aliquip officia laborum in veniam do proident tempor. Pariatur eu occaecat ex qui nulla anim amet velit laborum amet proident proident. Reprehenderit labore anim ad duis ea duis officia ut. Voluptate labore commodo elit ipsum quis laboris quis labore irure nulla non esse id. Incididunt eiusmod enim anim et sunt eiusmod esse irure duis. Deserunt adipisicing ad veniam officia.'
    }}

    return <Router><Item {...props} /></Router>
  })