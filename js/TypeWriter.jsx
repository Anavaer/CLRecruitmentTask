import React from 'react';

class TypeWriter extends React.Component {

  constructor() {
    super();

    this.state = {
      firstLine: '',
      secondLine: '',
      firstSpan: 'inline',
      secondSpan: 'none',
    }
  }

  componentDidMount() {

    let textFirst = '';
    let textSecond = '';
    this.intervalFirst = setInterval((fullText = [...this.props.text[0]], typedText = textFirst) => {
      textFirst = typedText.concat(fullText[typedText.length]);
      this.setState({firstLine: textFirst});

      if (this.state.firstLine === this.props.text[0]) {

        this.setState({firstSpan: 'none', secondSpan: 'inline'});
        clearInterval(this.intervalFirst);

        this.props.text.map((sentence, i) => {
          this.intervalSecond = setInterval((fullText = [...this.props.text[i + 1]], typedText = textSecond) => {
            console.log(this.props.text[2]);
            textSecond = typedText.concat(fullText[typedText.length]);
            this.setState({secondLine: textSecond});
            if(this.state.secondLine === this.props.text[i + 1]) {
              clearInterval(this.intervalSecond);
            }
          }, this.props.interval)
        });

      }
    }, this.props.interval);

  }

  componentWillUnmount() {
    clearInterval(this.intervalFirst);
  }

  render() {
    return (
      <div className="typeWriter">
        <p>{this.state.firstLine}<span style={{display: this.state.firstSpan}}>|</span></p>
        <p>{this.state.secondLine}<span style={{display: this.state.secondSpan}}>|</span></p>
      </div>
    );
  }
}

export default TypeWriter;