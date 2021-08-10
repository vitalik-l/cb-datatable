import { create } from '@storybook/theming';
import packageJson from '../package.json';

export default create({
  base: 'light',
  brandTitle: `cb-datatable ${packageJson.version}`,
  brandUrl: 'https://example.com',
});