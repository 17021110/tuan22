import React from 'react';
import { render } from '@testing-library/react';

import Homepage from '../components/HomePage';
test('should render homepage', () =>{
  const wrapper = render(<Homepage/>);
  expect(wrapper.container).toMatchSnapshot();
})