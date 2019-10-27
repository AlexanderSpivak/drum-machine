import React from 'react';
import './App.css';

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(event) {
    if (event.code === this.props.keyCode) {
      this.playSound();
    }
  }
  playSound(e) {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
  }
  render() {
    return (
      <div id={this.props.clipId} 
        onClick={this.playSound} 
        className="drum-pad" >
          <audio className='clip' id={this.props.keyTrigger} src={this.props.clip}></audio>
          {this.props.keyTrigger}
      </div>
    )
  }
}

class PadBank extends React.Component {
  render() {
    let padBank;
      padBank = bankOfMelodies.map((drumObj, i, padBankArr) => {
        return (
          <DrumPad 
						clipId={padBankArr[i].id} 
						clip={padBankArr[i].url}
						keyTrigger={padBankArr[i].keyTrigger}
						keyCode={padBankArr[i].keyCode} 
						updateDisplay={this.props.updateDisplay} 
						power={this.props.power} />
        )
      });
    return (
      <div className="pad-bank" >
				{padBank}
			</div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="outer-container">
      <div id="drum-machine" className="inner-container">
        <PadBank />
      </div>
      </div>
    )
  }
}
const bankOfMelodies = [{
  keyCode: "KeyQ",
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
  keyCode: "KeyW",
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
  keyCode: "KeyE",
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
  keyCode: "KeyA",
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
  keyCode: "KeyS",
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
  keyCode: "KeyD",
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
  keyCode: "KeyZ",
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
  keyCode: "KeyX",
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
  keyCode: "KeyC",
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
},
];
export default App;
