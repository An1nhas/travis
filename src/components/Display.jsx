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
      show: true,
      target: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClickTgr = this.handleClickTgr.bind(this);
  };
  componentDidMount() {
    if (data) {
      this.setState({
        keyboard: data.keyData
      });
    };

  };

  handleClick = (e) => {
    //if (e.target.value.match(/^[!-}\u20AC]{1}$/)) {
    this.setState({
      show: false
    })
    if (e.target.value.match(/^.{1}$/)) {
      this.setState({
        display: document.getElementById("input-field").value + e.target.value
      })
    } else if (e.target.value === "Clear") {
      this.setState({
        display: document.getElementById("input-field").value.slice(0, document.getElementById("input-field").value.length - 1)
      })
    } else if (e.target.value === "123.,") {
      this.setState({
        keyboardSet: 1,
        display: document.getElementById("input-field").value
      })
    } else if (e.target.value === "#+=") {
      this.setState({
        keyboardSet: 2,
        display: document.getElementById("input-field").value
      })
    } else if (e.target.value === "abc") {
      this.setState({
        keyboardSet: 0,
        display: document.getElementById("input-field").value
      })
    } else if (e.target.value === "Shift") {
      this.setState({
        shift: this.state.shift === false ? true : false,
        display: document.getElementById("input-field").value
      })
    } else if (e.target.value === "space") {
      this.setState({
        display: document.getElementById("input-field").value + ' '
      })
    } else if (e.target.value === "lng") {
      this.setState({
        keyLang: this.state.keyLang === "Eng" ? "Tgr" : "Eng",
        keyboardSet: 0,
        display: document.getElementById("input-field").value
      })
    }
  };

  handleClickTgr = (e) => {
    if (e.target.value.match(/^.{1}$/)) {
      this.setState({
        show: true,
        target: e.target.value,
        display: document.getElementById("input-field").value
      })
    } else {
      this.handleClick(e);
    }
  }


  render() {
    return (
      <div className="container">
        <input id="input-field" value={this.state.display}></input>
        <div id="suggestion-field" value=""></div>
        <Keyboard keyboard={this.state.keyboard}
          handleClick={this.handleClick}
          keyboardSet={this.state.keyboardSet}
          shift={this.state.shift}
          keyLang={this.state.keyLang}
          handleClickTgr={this.handleClickTgr}
          show={this.state.show}
          target={this.state.target} />
      </div>
    );
  }
};

export default Display;
