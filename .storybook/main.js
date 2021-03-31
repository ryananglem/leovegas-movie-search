module.exports = {
    stories: ['./**/*.story.@(ts|js)','../src/**/*.story.mdx', '../src/**/*.story.@(js|jsx|ts|tsx)'],
    addons: [
      '@storybook/addon-links',
      '@storybook/addon-essentials',
      '@storybook/addon-docs'
    ]
  };

  /*
  import React from 'react'
import { configure, addDecorator } from '@storybook/react';
import BaseStyle from '../src/styles/baseStyle'

addDecorator(s => <><BaseStyle />{s()}</>);

configure(require.context('../src', true, /\.story\.tsx$/), module);

*/