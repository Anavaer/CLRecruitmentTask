import React from 'react';
import TypeWriter from './TypeWriter';
import {textArray} from "./config";
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const component = renderer.create(
    <TypeWriter
      text={textArray}
      interval={120}
      delay={1500}
      infinite={false}
    />
  );
  expect(component).toMatchSnapshot();
});


