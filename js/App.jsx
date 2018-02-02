import React from 'react';
import {render} from 'react-dom';
import TypeWriter from './TypeWriter.jsx';
// Napisy zostają pobrane z pliku config.js
import {textArray} from './config';

class App extends React.Component {
  render() {
    // W propsach komponentu TypeWriter, można dokonać specyfikacji sposobu wyświetlania napisów
    return (
      <TypeWriter
        text={textArray}
        interval={120}
        delay={1500}
        infinite={false}
      />
    );
  }
}

render(
  <App/>,
  document.getElementById('app')
);
