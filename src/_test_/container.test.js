import React from 'react';
import { render } from '@testing-library/react';

import Container from '../components/Container'
jest.mock('../components/Container', () => {
    console.log('hello tuan')
});
test('test thu mock',()=>{
    const myMockFn = jest
    .fn()
    .mockReturnValue('default')
    .mockImplementation(x => 42 + x)
    .mockName('add42');
    myMockFn.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);
    if(myMockFn.mockReturnValueOnce(true)){
        console.log('hi');
    }
    else
        console.log('helo')
    // expect(myMockFn).toHaveBeenCalled();
    // expect(myMockFn).toHaveBeenCalledWith(arg1, arg2);
    // expect(myMockFn).toHaveBeenLastCalledWith(arg1, arg2);
    // expect(myMockFn).toMatchSnapshot();
})