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
    const {text} = this.props;
    let textFirst = '';
    let textSecond = '';
    let index = 1;

    this.intervalFirst = setInterval((fullText = [...text[0]], typedText = textFirst) => {
      textFirst = typedText.concat(fullText[typedText.length]);
      this.setState({firstLine: textFirst});

      if (this.state.firstLine === text[0]) {
        this.setState({firstSpan: 'none', secondSpan: 'inline'});
        clearInterval(this.intervalFirst);

        const repeatMessage = (amount) => {

          if(amount === 0){
            return Promise.resolve();
          }
          return new Promise(resolve => {
            setTimeout(() => {
              resolve();
            }, this.props.delay)
          })
            .then(() => this.intervalSecond = setInterval((fullText = [...text[index]], typedText = textSecond) => {
              if(typedText === text[index - 1]) {
                typedText = '';
              }
              textSecond = typedText.concat(fullText[typedText.length]);
              this.setState({secondLine: textSecond});
              if (this.state.secondLine === text[index]) {
                clearInterval(this.intervalSecond);
                index += 1;
              }
            }, this.props.interval))
            .then(() => {return repeatMessage(amount-1)})

        };

        repeatMessage(text.length - 1)
          .then(console.log('doone'))


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