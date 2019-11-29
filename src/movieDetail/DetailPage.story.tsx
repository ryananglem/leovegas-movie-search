import React from 'react';
import { storiesOf } from '@storybook/react'
import {DetailPage} from './DetailPage';

storiesOf('Movie Detail', module)
  .add('default', () => {
    const props = { 
        getMovie: () => null,
        isLoading: false,
        isFavourite: true,
        setFavourite: () => null,
        setWatchLater: () => null,
        match: {
            params: {
                id: 1
            }
        },
        movie: {
            id: '1',
            original_title: 'movie 1',
            overview: 'movie about a thing',
            release_date: '2004-10-20'
        }
    }
    return <DetailPage {...props} />
  })