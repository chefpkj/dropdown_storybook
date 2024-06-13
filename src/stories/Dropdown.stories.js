import Dropdown from './Dropdown';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Assignment/Dropdown',
  component: Dropdown,
  argTypes: {
    label: { control: 'text' },
    labelVisibility: {
      control: { type: 'select' },
      options: ['Visible', 'Hidden'],
    },
    status: {
      control: { type: 'select' },
      options: ['Unfilled', 'Filled', 'Disabled', 'Error'],
    },
    labelIconVisibility: {
      control: { type: 'select' },
      options: ['Visible', 'Hidden'],
    },
    leftIconVisibility: {
      control: { type: 'select' },
      options: ['Visible', 'Hidden'],
    },
    helperText: { control: 'text' },
    required: {
      control: { type: 'select' },
      options: ['Yes', 'No'],
    },
    text: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['SingleNoIcon', 'SingleRadio', 'Multi'],
    },
    activeItemIndex: { control: 'number' },
    items: { control: 'array' },
  },
};

const Template = (args) => <Dropdown {...args} onItemSelected={action('item-selected')} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary Label',
  labelVisibility: 'Visible',
  status: 'Unfilled',
  labelIconVisibility: 'Visible',
  leftIconVisibility: 'Visible',
  helperText: 'Helper text goes here',
  required: 'No',
  text: 'Select an option',
  type: 'SingleNoIcon',
  activeItemIndex: -1,
  items: ['Option 1', 'Option 2', 'Option 3'],
};
