import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Keyboard from './Keyboard';
import data from '../keyboardObj'

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboard: [],
      display: '',
      keyboardSet: 0,
      keyLang: 'Eng',
      shift: false,
      show: false
    }
  }
  ;
  componentDidMount() {
    if (data) {
      this.setState({
        keyboard: data.keyData
      });
    }
  };

  handleClick(e) {
    // if (e.target.value.match(/^[!-}\u20AC]{1}$/)) {
    this.setState({
      show: false
    })
    if (e.target.value.match(/^.{1}$/)) {
      this.setState({
        display: this.state.display + e.target.value
      })
    } else if (e.target.value === "Clear") {
      this.setState({
        display: this.state.display.slice(0, this.state.display.length - 1)
      })
    } else if (e.target.value === "123.,") {
      this.setState({
        keyboardSet: 1
      })
    } else if (e.target.value === "#+=") {
      this.setState({
        keyboardSet: 2
      })
    } else if (e.target.value === "abc") {
      this.setState({
        keyboardSet: 0
      })
    } else if (e.target.value === "Shift") {
      this.setState({
        shift: this.state.shift === false
      })
    } else if (e.target.value === "space") {
      this.setState({
        display: `${this.state.display} `
      })
    } else if (e.target.value === "lng") {
      this.setState({
        keyLang: this.state.keyLang === "Eng" ? "Ngr" : "Eng"
      })
    }
  };

  handleClickTgr(e) {
    this.setState({
      show: false
    })
    if (e.target.value.match(/^.{1}$/)) {
      this.setState({
        show: true
      })
    } else {
      this.handleClick(e);
    }
  }


  render() {
    return (
      <div className="container">
        <input id="input-field" value={this.state.display}></input>
        <Keyboard keyboard={this.state.keyboard}
          handleClick={this.handleClick}
          keyboardSet={this.state.keyboardSet}
          shift={this.state.shift}
          keyLang={this.state.keyLang}
          handleClickTgr={this.state.handleClickTgr}
          show={this.state.show} />
      </div>
    );
  }
};

export default Display;
