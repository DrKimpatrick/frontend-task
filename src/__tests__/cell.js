import React from 'react';
import { shallow } from 'enzyme';
import Cell from '../components/cell';

describe('Cell component', () => {
  it('Should render cell component', () => {
    const component = shallow(<Cell />);
  
    expect(component).toMatchSnapshot();
  });
  
});