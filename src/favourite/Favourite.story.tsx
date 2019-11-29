import React from 'react';
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions';
import { Favourite } from './Favourite';

storiesOf('Favourite', module)
  .add('is favourite', () => {
     return <Favourite isFavourite={true} setFavourite={action('set favourite')} id="1" />
  })
  .add('is not favourite', () => {
    return <Favourite isFavourite={false} setFavourite={action('set favourite')} id="1" />
 })