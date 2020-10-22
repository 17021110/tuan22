import React from 'react';
import { render } from '@testing-library/react';

import Funtiontest from '../components/Funtiontest';
// jest.mock('../components/Funtiontest', () => {
//     console.log('hello tuan1')
// });
test('test thu',()=>{
    const list=[{
        id:60,
        name:'FIRE',
        Source:'list'
    }]
    expect(Funtiontest(list)).toEqual([])
})