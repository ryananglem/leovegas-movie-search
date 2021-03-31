import React from 'react';
import { addDecorator } from '@storybook/react';
import BaseStyle from '../src/styles/baseStyle'

const container = Story => (
    <><BaseStyle/><Story /></>
);

addDecorator(container);