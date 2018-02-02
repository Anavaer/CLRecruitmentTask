import React from 'react';
import {render} from 'react-dom';
import TypeWriter from './TypeWriter';

class App extends React.Component {
  render() {
    return (
      <TypeWriter
        text={}
      />
    );
  }
}

render(
  <App/>,
  document.getElementById('app')
);
