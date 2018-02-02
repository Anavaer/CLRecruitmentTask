import React from 'react';
import {render} from 'react-dom';
import TypeWriter from './TypeWriter.jsx';
import {textArray} from './config';

class App extends React.Component {
  render() {
    return (
      <TypeWriter
        text={textArray}
        interval={100}
        delay={2000}
      />
    );
  }
}

render(
  <App/>,
  document.getElementById('app')
);
