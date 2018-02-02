import React from 'react';

class TypeWriter extends React.Component {

  constructor() {
    super();
    // Początkowa wartość state zawiera sposoby pokazywania elementów span
    // i zawartość wyświetlaną w paragrafach
    this.state = {
      firstLine: '',
      secondLine: '',
      firstSpan: 'inline',
      secondSpan: 'none',
    }
  }

  componentDidMount() {

    // Dokonuję destrukturyzacji obiektu props a także tworzę zmiennę
    // których będę używał do wyświetlania napisów
    const {text, interval, delay} = this.props;
    let textFirst = '';
    let textSecond = '';
    let index = 1;
    let newSentence = true;


    this.intervalFirst = setInterval((fullText = [...text[0]], typedText = textFirst) => {
      // Cały napis dodaje się litera po literze, zostaje zapisany w state i wyświetlony
      textFirst = typedText.concat(fullText[typedText.length]);
      this.setState({firstLine: textFirst});

      // Jeśli cały napis został już wyświetlony to:
      // Znika pierwszy span i pojawia się drugi
      // Pierwszy interwał zostaje wyczyszczony
      if (this.state.firstLine === text[0]) {
        this.setState({firstSpan: 'none', secondSpan: 'inline'});
        clearInterval(this.intervalFirst);

        // Zostaje odpalony drugi interwał literujący drugą linijkę tekstu
        this.intervalSecond = setInterval((fullText = [...text[index]], typedText = textSecond) => {

          // Przy każdym nowym zdaniu flaga newSentence odpala timeout trwający ilośc czasu podaną w props
          if (newSentence) {
            this.timeout = setTimeout(() => {
              newSentence = false;
            }, delay);
          } else {
            // Tak jak wcześniej zdanie zostaje wyświetlone litera po literze
            textSecond = typedText.concat(fullText[typedText.length]);
            this.setState({secondLine: textSecond});

            // Pod koniec każdego zdania index się zwiększa, wyświetlany tekst zeruję a flaga resetuje
            if (this.state.secondLine === text[index]) {
              index += 1;
              textSecond = '';
              newSentence = true;
            }

            // Pod koniec wyświetlania całości tablicy, w zależności of własności infinite podanej w props
            // następuje albo zakończenie wywietlania albo reset indexu do 1
            if (!this.props.infinite && index === text.length) {
              clearInterval(this.intervalSecond);
            } else if (index === text.length) {
              index = 1;
            }
          }

        }, interval)

      }
    }, interval);

  }

  componentWillUnmount() {
    clearInterval(this.intervalFirst);
  }

  render() {
    // Komponent renderuje diva z dwoma paragrafami a ich zawartość jest zależna od state
    // Po wygenerowaniu całego pierwszego napisu this.state.firstSpan zmienia się na none i
    // powoduje zniknięcie elementu span
    return (
      <div className="typeWriter">
        <p>{this.state.firstLine}<span style={{display: this.state.firstSpan}}>|</span></p>
        <p>{this.state.secondLine}<span style={{display: this.state.secondSpan}}>|</span></p>
      </div>
    );
  }
}

export default TypeWriter;