import React from 'react';
import './App.css';
import { classBody } from '@babel/types';
/* Клавиша */
class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle
    }
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
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
  changeStyle() {
    if (this.state.padStyle === inactiveStyle) {
      this.setState({
        padStyle: activeStyle
      });
    }
    else {
      this.setState({
        padStyle: inactiveStyle
      });
    }
  }
  playSound(e) {
    if (!document.getElementById('switchOff').checked) {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.props.updateDisplay(this.props.clipId.replace());
    }
    this.changeStyle();
    setTimeout(() => this.changeStyle(), 100);
  }
  render() {
    return (
      <div id={this.props.clipId} style={this.state.padStyle}
        onClick={this.playSound} 
        className="drum-pad" >
          <audio className='clip' id={this.props.keyTrigger} src={this.props.clip}></audio>
          {this.props.keyTrigger}
      </div>
    )
  }
}
/* Панель с клавишами */
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
  constructor(props) {
    super(props);
    this.state = {
      display: "Have fun!"
    }
    this.displayClipName = this.displayClipName.bind(this);
  }
  displayClipName(name) {
    this.setState({
      display: name
    });
  }
  render() {
    return (
      <div className="outer-container" id="drum-machine">
        <div className="inner-container">
          <div className="display">{this.state.display}</div>
          <PadBank updateDisplay={this.displayClipName}/>
            <div className="control-panel">
              <label className="switch">
                <input type="checkbox" id="switchOff"/>
                <div className="slider"/>
              </label>
            </div>
          </div>
      </div>
    )
  }
}
const activeStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  color: "rgb(81, 200, 221)",
  textShadow: "1px 1px 4px white"

} ;
const inactiveStyle = {
  backgroundColor: "rgb(84, 85, 84)",
  boxShadow: "3px 3px 5px black",
  textShadow: "1px 1px 1px gray"
};

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
