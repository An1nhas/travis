/* eslint-disable no-console */
import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Keyboard from './Keyboard';
import data from '../keyboardObj';
import { Button, Input, Form } from 'reactstrap';
import { MdSwapHoriz, MdFlag } from "react-icons/md";




export default class Phonetics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboard: [],

      english: '',
      dict: {},
      queue: '',
      finalizedSymbols: '',
      display: '',
      translation: '',
      improvedTranslation: '',
      TigrinyaToEnglish: true,
      improveTranslation: false,

      keyboardSet: 0,
      shift: false,
      show: true,
      target: null
    }
    this.improveTranslation = this.improveTranslation.bind(this);
    this.improveChangeHandler = this.improveChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.switchTranslations = this.switchTranslations.bind(this);
    this.englishToTigrinya = this.englishToTigrinya.bind(this);

    this.handleClick = this.handleClick.bind(this);
    this.handleClickTgr = this.handleClickTgr.bind(this);
  };

  componentWillMount() {
    const config = {
      headers: { 'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg2Mzg0NDFiLWYzYTgtNDIyNC05ZmRiLWI2YWMxYzdmMmI5OSIsImVtYWlsIjoiaGVsbG9AdHJhdmlzLmZvdW5kYXRpb24iLCJmdWxsX25hbWUiOiJUcmF2aXMgRm91bmRhdGlvbiIsInJvbGUiOiJhcGktY2xpZW50IiwiaWF0IjoxNTUxMzA2MjMzLCJuYmYiOjE1NTEzMDYxNzMsImV4cCI6MTU4Mjg2MzgzMywiaXNzIjoiaHR0cDovL3RyYXZpcy5mb3VuZGF0aW9uIiwic3ViIjoiaGVsbG9AdHJhdmlzLmZvdW5kYXRpb24iLCJqdGkiOiJ0cmF2aXMtZm91bmRhdGlvbi10cmFuc2xhdGlvbi1hcGkifQ.TUjINnAwQAC3LOVTZOti1IoGf9Wi730e2jFEqdOxkkQ' }
    }
    axios.get('http://localhost:8080/api/lang', config).then(response => this.setState({ dict: response.data }));
  }

  componentDidMount() {
    if (data) {
      this.setState({
        keyboard: data.keyData
      });
    };

  };


  tigrinyaToEnglish(e) {
 
    const { finalizedSymbols, queue, english, dict, display } = this.state;

    // Letters which end a symbol
    const stoppers = /(([^KkghQq]u)|[aeoAW])$/;
    // History of all Latin keyboard inputs
    const newEnglish = english.concat(" ", e.nativeEvent.data);
    const updatedQueue = queue.concat(e.nativeEvent.data);

    console.log("Stopper test: ", stoppers.test(updatedQueue), " Queue is: ", updatedQueue);
    console.log(e.nativeEvent.data);
    console.log(Date.now());
    console.log(Date.now() + 10 - Date.now());

    if (/[^a-zNKQHPCTZOKS2]/.test(e.nativeEvent.data)) {
      console.log("Character ", e.nativeEvent.data, " doesn't correspond to anything in Tigrinya");
      if (queue !== '') {

        const newFinalizedSymbols = finalizedSymbols.concat(dict[queue]).concat(e.nativeEvent.data);
        this.setState({
          finalizedSymbols: newFinalizedSymbols,
          display: newFinalizedSymbols, queue: '', english: newEnglish
        })
      } else {

        this.setState({
          finalizedSymbols: finalizedSymbols.concat(e.nativeEvent.data),
          display: finalizedSymbols.concat(e.nativeEvent.data), english: newEnglish
        })
      }

      // "Translate" after each space
      if (/\s/.test(e.nativeEvent.data)) {
        const splitBySpace = display.split(" ");
        // eslint-disable-next-line no-useless-escape
        const test2 = splitBySpace.map(word => word.replace(/[^a-zA-Z0-9./<>?;:"'`!@#$%^&*()\[\]{}_+=|\\-]+/g, "<English>"))
        const print = test2.join(" ");
        this.setState({ translation: print })
      }
    }
    else if (e.nativeEvent.inputType === "deleteContentBackward") {
      if (display.length === finalizedSymbols.length) {
        this.setState({
          display: display.slice(0, -1),
          finalizedSymbols: finalizedSymbols.slice(0, -1), queue: ''
        })
      } else if (display.length >= finalizedSymbols.length) {
        this.setState({ display: display.slice(0, -1), queue: '' })
      } else {
        console.log("SHOULDN'T BE HERE");
      }
    }
    // If, after inputing the newest letter, the queue has no match in the dictionary we return the last valid symbol
    // and begin a new queue with the new letter
    else if (typeof dict[updatedQueue] === "undefined") {
      console.log("Not defined");
      this.setState({
        queue: e.nativeEvent.data, finalizedSymbols: finalizedSymbols.concat(dict[queue]),
        display: finalizedSymbols.concat(dict[queue].concat(dict[e.nativeEvent.data]))
      })
      console.log("Added in final form:", dict[queue], " ", updatedQueue);
    }
    else if (stoppers.test(queue.concat(e.nativeEvent.data))) {

      const finalSymbol = dict[updatedQueue];
      console.log("Added in final form:", finalSymbol, " ", updatedQueue);

      this.setState({
        queue: '', finalizedSymbols: finalizedSymbols.concat(finalSymbol),
        display: finalizedSymbols.concat(finalSymbol), english: newEnglish
      })
    }
    else if (updatedQueue.length === 1 || updatedQueue.length === 2 || updatedQueue.length === 3) {
      console.log("Queue len == 1", dict[updatedQueue])
      this.setState({
        display: finalizedSymbols.concat(dict[updatedQueue]),
        queue: updatedQueue, english: newEnglish
      })
    }

    console.log(newEnglish);
    console.log("updatedQueue: ", updatedQueue);
  }

  englishToTigrinya(e) {
    const { display } = this.state;
    if (e) this.setState({ display: e.target.value });
    if (/\s/.test(e.nativeEvent.data)) {
      const splitBySpace = display.split(" ");
      // eslint-disable-next-line no-useless-escape
      const test2 = splitBySpace.map(word => word.replace(/[^0-9./<>?;:"'`!@#$%^&*()\[\]{}_+=|\\-]+/g, "<Tigrinya>"))
      const print = test2.join(" ");
      this.setState({ translation: print });
    }
  }

  improveTranslation() {
    const { improveTranslation, translation } = this.state;
    this.setState({ improveTranslation: !improveTranslation, improvedTranslation: translation });
  }

  improveChangeHandler(e) {
    this.setState({ improvedTranslation: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { improvedTranslation } = this.state;
    alert(`The improved translation is: ${improvedTranslation}`);
  }

  switchTranslations() {
    const { TigrinyaToEnglish } = this.state;
    this.setState({ finalizedSymbols: '', TigrinyaToEnglish: !TigrinyaToEnglish, display: '', queue: '', translation: '', improvedTranslation: '', english: '', improveTranslation: false })
  }


  handleClick(e) {
    if (typeof e.target.value != 'undefined') {
      this.setState({
        show: false,
        queue: ''
      })
      if (e.target.value.match(/^.{1}$/)) {
        this.setState({
          display: document.getElementById("input-field").value + e.target.value,
          finalizedSymbols: document.getElementById("input-field").value + e.target.value
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
          shift: this.state.shift === false,
          display: document.getElementById("input-field").value
        })
      } else if (e.target.value === "space") {
        this.setState({
          display: `${document.getElementById("input-field").value} `
        })
      }
    };
  };

  handleClickTgr(e) {
    if (typeof e.target.value != 'undefined') {
      if (e.target.value.match(/^.{1}$/)) {
        this.setState({
          queue: '',
          show: true,
          target: e.target.value,
          display: document.getElementById("input-field").value,
          finalizedSymbols: document.getElementById("input-field").value

        })
      } else {
        this.handleClick(e);
      }
    };
  }



    render() {

        const { display, translation, TigrinyaToEnglish, improveTranslation, improvedTranslation } = this.state;
        return (
            <Container>
                <Button outline color="secondary" size="sm" style={{width: '70px', marginBottom: '5px'}} onClick={this.switchTranslations}><MdSwapHoriz /></Button>
                {TigrinyaToEnglish ?
                <Container style={{margin: '0'}}>
                  <p>Tigrinya to English</p>
                    <Row>
                      
                        <Col xs={12} md={6}>
                      
                            <div>
                                <textarea type='text' id="input-field" value={display} onChange={(e) => this.tigrinyaToEnglish(e)} />
                            </div>
                        </Col>

                        <Col xs={12} md={6}>
                            <div>
                                <textarea type="text" id="input-field" placeholder={translation}/>
                            </div>
                            <div>
                                {improveTranslation ?
                                    <Form onSubmit={this.handleSubmit}>
                                      <Row>
                                    <Col xs={7} md={10}>
                                        <Input type='text' placeholder="Type your corrections here..." value={improvedTranslation} onChange={this.improveChangeHandler} />
                                    </Col>
                                    <Col xs={1} md={2}>
                                        <Button type="submit">Submit</Button>
                                    </Col>
                                    <div>
                                    <h6 style={{marginTop:'20px'}}>The Sentence Society</h6>
                                    <p style={{fontSize:'14px'}}>By playing this game, you're helping us digitise Tigrinya and and helping your fellow Tigrinya speakers all over the world.</p>
                                    <a href="https://www.thesentencesociety.org/index.html"><Button id="game_button" outline color="secondary">PLAY GAME</Button></a>
                                     </div>
                                    </Row>
                                    </Form>
                                    : <Button type="button" size="sm" onClick={this.improveTranslation}><MdFlag/> Improve translation</Button>}
                            </div>
                        </Col>
                    </Row> 
                    </Container> :
                    <Container style={{margin: '0'}}>
                      <p>English to Tigrinya</p>
                    <Row>
                        <Col xs={12} md={6}>
                          
                            <div>
                                <textarea type='text' id="input-field" value={display} onChange={this.englishToTigrinya} />
                            </div>
                        </Col>

                        <Col xs={12} md={6}>
                            <div>
                            <textarea type="text" id="input-field" placeholder={translation}/>
                            </div>
                            <div>
                                {improveTranslation ?
                                    <Form onSubmit={this.handleSubmit}>
                                        <Row>
                                    <Col xs={7} md={10}>
                                        <Input type='text' placeholder="Type your corrections here..." value={improvedTranslation} onChange={this.improveChangeHandler} />
                                    </Col>
                                    <Col xs={1} md={2}>
                                        <Button type="submit">Submit</Button>
                                    </Col>
                                    <div>
                                    <h6 style={{marginTop:'20px'}}>The Sentence Society</h6>
                                    <p style={{fontSize:'14px'}}>By playing this game, you're helping us digitise Tigrinya and and helping your fellow Tigrinya speakers all over the world.</p>
                                    <a href="https://www.thesentencesociety.org/index.html"><Button id="game_button" outline color="secondary">PLAY GAME</Button></a>
                                     </div>
                                    </Row>
                                    </Form>
                                    : <Button type="button" size="sm" onClick={this.improveTranslation}><MdFlag/> Improve translation</Button>}
                            </div>
                        </Col>
                    </Row>
                    </Container>}

                <Keyboard keyboard={this.state.keyboard} 
                    handleClick={this.handleClick} 
                    keyboardSet={this.state.keyboardSet}
                    shift={this.state.shift} 
                    keyLang={this.state.keyLang}
                    handleClickTgr={this.handleClickTgr}
                    show={this.state.show}
                    target={this.state.target} />
     
            </Container>

        );
    );
  };
};