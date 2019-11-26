import React from 'react';
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions';
import { Search } from './Search';

storiesOf('Search', module)
  .add('default', () => {
    const props = {
        onSearch: () => action('Search clicked')
    }

    return <Search {...props} />
  })