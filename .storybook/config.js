/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'DataTable',
  downPanelInRight: true
});

// function loadStories() {
//   require('../stories');
// }

const req = require.context('../stories', true, /.+\.story\.js?x/);

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module);
