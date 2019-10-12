import React from 'react';
import { shallow } from 'enzyme';
import Board from '../components/Board';

describe('Board component', () => {
  it('Should render Board component', () => {
    const component = shallow(<Board size={2} board={[3,3]} updateBoard={()=> {}} sprite={[3]} />);
  
    expect(component).toMatchSnapshot();
  });
  
});