
import React from 'react';
import { render } from '@testing-library/react';

import SideBar from '../components/SideBar';
test('should render sidebar', () =>{
  const wrapper = render(<SideBar/>);
  expect(wrapper.container).toMatchSnapshot();
})