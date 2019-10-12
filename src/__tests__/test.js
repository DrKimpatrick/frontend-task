import React from 'react';
import { shallow } from 'enzyme';
import Test from '../components/test';

describe('Test component', () => {
  it('Should render test componet', () => {
    const component = shallow(<Test />);
  
    expect(component).toMatchSnapshot();
  });
});