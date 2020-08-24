/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import React from 'react';
import { configure , addDecorator} from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { withInfo } from '@storybook/addon-info';
import packageJson from '../package.json';
import Container from './Container';

addDecorator(
  withInfo({
    styles: {
      children: {
        width: '100%',
      },
    },
    maxPropStringLength: 200, // Displays the first 200 characters in the default prop string
  })
);

addDecorator(story => <Container story={story} />);

setOptions({
  name: `DataTable ${packageJson.version}`,
  downPanelInRight: true
});

const req = require.context('../stories', true, /.+\.story\.jsx?$/);

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module);
