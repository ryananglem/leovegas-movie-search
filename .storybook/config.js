import React from 'react'
import { configure, addDecorator } from '@storybook/react';
import BaseStyle from '../src/styles/baseStyle'

addDecorator(s => <><BaseStyle />{s()}</>);

configure(require.context('../src', true, /\.story\.tsx$/), module);

