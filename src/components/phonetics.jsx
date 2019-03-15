/* eslint-disable no-console */
import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Input, Form } from 'reactstrap';
import { MdSwapHoriz, MdFlag } from "react-icons/md";
import Keyboard from './Keyboard';
import data from '../keyboardObj';

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
      target: null,

      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg2Mzg0NDFiLWYzYTgtNDIyNC05ZmRiLWI2YWMxYzdmMmI5OSIsImVtYWlsIjoiaGVsbG9AdHJhdmlzLmZvdW5kYXRpb24iLCJmdWxsX25hbWUiOiJUcmF2aXMgRm91bmRhdGlvbiIsInJvbGUiOiJhcGktY2xpZW50IiwiaWF0IjoxNTUxMzA2MjMzLCJuYmYiOjE1NTEzMDYxNzMsImV4cCI6MTU4Mjg2MzgzMywiaXNzIjoiaHR0cDovL3RyYXZpcy5mb3VuZGF0aW9uIiwic3ViIjoiaGVsbG9AdHJhdmlzLmZvdW5kYXRpb24iLCJqdGkiOiJ0cmF2aXMtZm91bmRhdGlvbi10cmFuc2xhdGlvbi1hcGkifQ.TUjINnAwQAC3LOVTZOti1IoGf9Wi730e2jFEqdOxkkQ'
    }
    this.improveTranslation = this.improveTranslation.bind(this);
    this.improveChangeHandler = this.improveChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.switchTranslations = this.switchTranslations.bind(this);
    this.englishToTigrinya = this.englishToTigrinya.bind(this);
    this.translateTiToEn = this.translateTiToEn.bind(this);
    this.translateEnToTi = this.translateEnToTi.bind(this);
    this.handlePaste = this.handlePaste.bind(this);

    this.handleClick = this.handleClick.bind(this);
    this.handleClickTgr = this.handleClickTgr.bind(this);
  };

  componentDidMount() {
    if (data) {
      this.setState({
        keyboard: data.keyData
      });
    };

    const config = {
      headers: { 'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg2Mzg0NDFiLWYzYTgtNDIyNC05ZmRiLWI2YWMxYzdmMmI5OSIsImVtYWlsIjoiaGVsbG9AdHJhdmlzLmZvdW5kYXRpb24iLCJmdWxsX25hbWUiOiJUcmF2aXMgRm91bmRhdGlvbiIsInJvbGUiOiJhcGktY2xpZW50IiwiaWF0IjoxNTUxMzA2MjMzLCJuYmYiOjE1NTEzMDYxNzMsImV4cCI6MTU4Mjg2MzgzMywiaXNzIjoiaHR0cDovL3RyYXZpcy5mb3VuZGF0aW9uIiwic3ViIjoiaGVsbG9AdHJhdmlzLmZvdW5kYXRpb24iLCJqdGkiOiJ0cmF2aXMtZm91bmRhdGlvbi10cmFuc2xhdGlvbi1hcGkifQ.TUjINnAwQAC3LOVTZOti1IoGf9Wi730e2jFEqdOxkkQ' }
    }
    axios.get('http://localhost:8080/api/lang', config).then(response => this.setState({ dict: response.data }));

  };


  tigrinyaToEnglish(e) {

    const { finalizedSymbols, queue, english, dict, display, improvedTranslation } = this.state;
    if (e.nativeEvent.key) e.nativeEvent.data = e.nativeEvent.key;
    // Letters which end a symbol
    const stoppers = /(([^KkghQq]u)|[aeoAW])$/;
    // History of all Latin keyboard inputs
    const newEnglish = english.concat(" ", e.nativeEvent.data);
    const updatedQueue = queue.concat(e.nativeEvent.data);

    console.log("Stopper test: ", stoppers.test(updatedQueue), " Queue is: ", updatedQueue);
    console.log(e.nativeEvent.data);

    if (/[^a-zNKQHPCTZOKS2]/.test(e.nativeEvent.data)) {
      console.log("Character ", e.nativeEvent.data, " doesn't correspond to anything in Tigrinya");
      if (queue !== '') {

        const newFinalizedSymbols = finalizedSymbols.concat(dict[queue]).concat(e.nativeEvent.data);
        this.setState({
          finalizedSymbols: newFinalizedSymbols,
          [e.currentTarget.name]: newFinalizedSymbols, queue: '', english: newEnglish
        })
      } else {

        this.setState({
          finalizedSymbols: finalizedSymbols.concat(e.nativeEvent.data),
          [e.currentTarget.name]: finalizedSymbols.concat(e.nativeEvent.data), english: newEnglish
        })
      }

    }
    else if (e.nativeEvent.inputType === "deleteContentBackward") {
      this.setState({
        [e.currentTarget.name]: e.currentTarget.value,
        finalizedSymbols: e.currentTarget.value,
        queue: ''
      })
    }
    // If, after inputing the newest letter, the queue has no match in the dictionary we return the last valid symbol
    // and begin a new queue with the new letter
    else if (typeof dict[updatedQueue] === "undefined") {
      console.log("Not defined");
      this.setState({
        queue: e.nativeEvent.data, finalizedSymbols: finalizedSymbols.concat(dict[queue]),
        [e.currentTarget.name]: finalizedSymbols.concat(dict[queue].concat(dict[e.nativeEvent.data]))
      })
      console.log("Added in final form:", dict[queue], " ", updatedQueue);
    }
    else if (stoppers.test(queue.concat(e.nativeEvent.data))) {

      const finalSymbol = dict[updatedQueue];
      console.log("Added in final form:", finalSymbol, " ", updatedQueue);

      this.setState({
        queue: '', finalizedSymbols: finalizedSymbols.concat(finalSymbol),
        [e.currentTarget.name]: finalizedSymbols.concat(finalSymbol), english: newEnglish
      })
    }
    else if (updatedQueue.length === 1 || updatedQueue.length === 2 || updatedQueue.length === 3) {
      console.log("Queue len == 1", dict[updatedQueue])
      this.setState({
        [e.currentTarget.name]: finalizedSymbols.concat(dict[updatedQueue]),
        queue: updatedQueue, english: newEnglish
      })
    }


    // const config = {
    //   headers: { 'Authorization': `bearer ${token}` }
    // }
    // const config = {
    //   headers: { 'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg2Mzg0NDFiLWYzYTgtNDIyNC05ZmRiLWI2YWMxYzdmMmI5OSIsImVtYWlsIjoiaGVsbG9AdHJhdmlzLmZvdW5kYXRpb24iLCJmdWxsX25hbWUiOiJUcmF2aXMgRm91bmRhdGlvbiIsInJvbGUiOiJhcGktY2xpZW50IiwiaWF0IjoxNTUxMzA2MjMzLCJuYmYiOjE1NTEzMDYxNzMsImV4cCI6MTU4Mjg2MzgzMywiaXNzIjoiaHR0cDovL3RyYXZpcy5mb3VuZGF0aW9uIiwic3ViIjoiaGVsbG9AdHJhdmlzLmZvdW5kYXRpb24iLCJqdGkiOiJ0cmF2aXMtZm91bmRhdGlvbi10cmFuc2xhdGlvbi1hcGkifQ.TUjINnAwQAC3LOVTZOti1IoGf9Wi730e2jFEqdOxkkQ' }
    // }

    // const translate = async () => {
    //   const response = await axios.post('http://localhost:8080/api/translate', {
    //     "source_lang": "ti",
    //     "target_lang": "en",
    //     "phrase": display
    //   }, config)

    //   const { translations } = await response.data;
    //   console.log("--------TRANSLATION", translations[0].text);
    //   this.setState({ translation: translations[0].text })

    //   // this.setState({translation: })
    //   // .then(res => {
    //   //   console.log("TRANSLATION: ", res.data.translations[0].text)
    //   //   this.setState({ translation: res.data.translations[0].text })
    //   // })
    // }

    // translate();

    console.log(newEnglish);
    console.log("updatedQueue: ", updatedQueue);
  }

  async translateTiToEn() {
    const { display } = this.state;
    const config = {
      headers: { 'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg2Mzg0NDFiLWYzYTgtNDIyNC05ZmRiLWI2YWMxYzdmMmI5OSIsImVtYWlsIjoiaGVsbG9AdHJhdmlzLmZvdW5kYXRpb24iLCJmdWxsX25hbWUiOiJUcmF2aXMgRm91bmRhdGlvbiIsInJvbGUiOiJhcGktY2xpZW50IiwiaWF0IjoxNTUxMzA2MjMzLCJuYmYiOjE1NTEzMDYxNzMsImV4cCI6MTU4Mjg2MzgzMywiaXNzIjoiaHR0cDovL3RyYXZpcy5mb3VuZGF0aW9uIiwic3ViIjoiaGVsbG9AdHJhdmlzLmZvdW5kYXRpb24iLCJqdGkiOiJ0cmF2aXMtZm91bmRhdGlvbi10cmFuc2xhdGlvbi1hcGkifQ.TUjINnAwQAC3LOVTZOti1IoGf9Wi730e2jFEqdOxkkQ' }
    }
    const response = await axios.post('http://localhost:8080/api/translate', {
      "source_lang": "ti",
      "target_lang": "en",
      "phrase": display
    }, config)

    const { translations } = await response.data;
    console.log("TRANSLATION", translations[0].text);
    this.setState({ translation: translations[0].text.slice(0, -1) })
  }

  englishToTigrinya(e) {
    console.log(e);
    const { display } = this.state;
    if (e) this.setState({ display: e.target.value });

    const config = {
      headers: { 'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg2Mzg0NDFiLWYzYTgtNDIyNC05ZmRiLWI2YWMxYzdmMmI5OSIsImVtYWlsIjoiaGVsbG9AdHJhdmlzLmZvdW5kYXRpb24iLCJmdWxsX25hbWUiOiJUcmF2aXMgRm91bmRhdGlvbiIsInJvbGUiOiJhcGktY2xpZW50IiwiaWF0IjoxNTUxMzA2MjMzLCJuYmYiOjE1NTEzMDYxNzMsImV4cCI6MTU4Mjg2MzgzMywiaXNzIjoiaHR0cDovL3RyYXZpcy5mb3VuZGF0aW9uIiwic3ViIjoiaGVsbG9AdHJhdmlzLmZvdW5kYXRpb24iLCJqdGkiOiJ0cmF2aXMtZm91bmRhdGlvbi10cmFuc2xhdGlvbi1hcGkifQ.TUjINnAwQAC3LOVTZOti1IoGf9Wi730e2jFEqdOxkkQ' }
    }

    const translate = async (event) => {
      const response = await axios.post('http://localhost:8080/api/translate', {
        "source_lang": "en",
        "target_lang": "ti",
        "phrase": display + event.nativeEvent.data
      }, config)

      const { translations } = await response.data;
      console.log("--------TRANSLATION", translations[0].text);
      this.setState({ translation: translations[0].text.slice(0, -2) })

      // this.setState({translation: })
      // .then(res => {
      //   console.log("TRANSLATION: ", res.data.translations[0].text)
      //   this.setState({ translation: res.data.translations[0].text })
      // })
    }
    console.log(e.nativeEvent.data);
    translate(e);


  }

  async translateEnToTi() {
    const { display } = this.state;
    const config = {
      headers: { 'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg2Mzg0NDFiLWYzYTgtNDIyNC05ZmRiLWI2YWMxYzdmMmI5OSIsImVtYWlsIjoiaGVsbG9AdHJhdmlzLmZvdW5kYXRpb24iLCJmdWxsX25hbWUiOiJUcmF2aXMgRm91bmRhdGlvbiIsInJvbGUiOiJhcGktY2xpZW50IiwiaWF0IjoxNTUxMzA2MjMzLCJuYmYiOjE1NTEzMDYxNzMsImV4cCI6MTU4Mjg2MzgzMywiaXNzIjoiaHR0cDovL3RyYXZpcy5mb3VuZGF0aW9uIiwic3ViIjoiaGVsbG9AdHJhdmlzLmZvdW5kYXRpb24iLCJqdGkiOiJ0cmF2aXMtZm91bmRhdGlvbi10cmFuc2xhdGlvbi1hcGkifQ.TUjINnAwQAC3LOVTZOti1IoGf9Wi730e2jFEqdOxkkQ' }
    }
    const response = await axios.post('http://localhost:8080/api/translate', {
      "source_lang": "en",
      "target_lang": "ti",
      "phrase": display
    }, config)

    const { translations } = await response.data;
    console.log("TRANSLATION", translations[0].text);
    this.setState({ translation: translations[0].text.slice(0, -2) })
  }

  improveTranslation() {
    const { improveTranslation, translation } = this.state;
    this.setState({ improveTranslation: !improveTranslation, improvedTranslation: translation, finalizedSymbols: translation });
  }

  improveChangeHandler(e) {
    this.setState({ improvedTranslation: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // Here we add a correction to our database
    const { display, translation, improvedTranslation } = this.state;
    alert(`The improved translation is: ${improvedTranslation}`);
  }

  switchTranslations() {
    const { TigrinyaToEnglish } = this.state;
    this.setState({ finalizedSymbols: '', TigrinyaToEnglish: !TigrinyaToEnglish, display: '', queue: '', translation: '', improvedTranslation: '', english: '', improveTranslation: false })
  }

  handleClick(e) {
    if (typeof e.target.value !== 'undefined') {
      this.setState({
        show: false,
        queue: ''
      });
      if (this.state.TigrinyaToEnglish === true) {
        this.translateTiToEn();
      }
      
      var targetState = this.state.improveTranslation === false ? "display" : "improvedTranslation";
      var targetField = this.state.improveTranslation === false ? "input-field" : "correctionField";
      if (e.target.value.match(/^.{1}$/)) {
        this.setState({
          [targetState]: document.getElementById(targetField).value + e.target.value,
          finalizedSymbols: document.getElementById(targetField).value + e.target.value
        })
      } else if (e.target.value === "Clear") {
        this.setState({
          [targetState]: document.getElementById(targetField).value.slice(0, document.getElementById(targetField).value.length - 1)
        })
      } else if (e.target.value === "123.,") {
        this.setState({
          keyboardSet: 1,
          [targetState]: document.getElementById(targetField).value
        })
      } else if (e.target.value === "#+=") {
        this.setState({
          keyboardSet: 2,
          [targetState]: document.getElementById(targetField).value
        })
      } else if (e.target.value === "abc") {
        this.setState({
          keyboardSet: 0,
          [targetState]: document.getElementById(targetField).value
        })
      } else if (e.target.value === "Shift") {
        this.setState({
          shift: this.state.shift === false,
          [targetState]: document.getElementById(targetField).value
        })
      } else if (e.target.value === "space") {
        this.setState({
          [targetState]: `${document.getElementById(targetField).value} `
        })
      } else if (e.target.value === "return") {
        this.setState({
          [targetState]: `${document.getElementById(targetField).value} \n`,
          finalizedSymbols: `${document.getElementById(targetField).value} \n`,
        })
      }
    };
  };

  handleClickTgr(e) {
    if (typeof e.target.value !== 'undefined') {
      if (e.target.value.match(/^.{1}$/)) {
        this.setState({
          queue: '',
          show: true,
          target: e.target.value,
          // [targetState]: document.getElementById(targetField).value,
          // finalizedSymbols: document.getElementById(targetField).value,
        })
      } else {
        this.handleClick(e);
      }
    };
  }

  handlePaste(e) {
    const { display } = this.state;
    this.setState({
      display: display.concat(e.clipboardData.getData('text')),
      finalizedSymbols: display.concat(e.clipboardData.getData('text')),
      queue: ''
    })
  }



  render() {

    const { display, translation, TigrinyaToEnglish, improveTranslation, improvedTranslation } = this.state;
    return (
      <Container>
        <Button outline color="secondary" size="sm" style={{ width: '70px', marginBottom: '5px' }} onClick={this.switchTranslations}><MdSwapHoriz /></Button>
        {TigrinyaToEnglish ?
          <Container style={{ margin: '0' }}>
            <p>Tigrinya to English</p>
            <Row>

              <Col xs={12} md={6}>

                <div>
                  <textarea type='text' id="input-field" name="display" value={display} onKeyPress={e => this.tigrinyaToEnglish(e)} onChange={(e) => { this.translateTiToEn(); }} onPaste={this.handlePaste} />
                </div>
              </Col>

              <Col xs={12} md={6}>
                <div>
                  <textarea type="text" id="input-field" value={translation} disabled />
                </div>
                <div>
                  {improveTranslation ?
                    <Form onSubmit={this.handleSubmit}>
                      <Row>
                        <Col xs={7} md={10}>
                          <Input type='text' id="correctionField" placeholder="Type your corrections here..." value={improvedTranslation} onChange={this.improveChangeHandler} />
                        </Col>
                        <Col xs={1} md={2}>
                          <Button type="submit">Submit</Button>
                        </Col>
                        <div>
                          <h6 style={{ marginTop: '20px' }}>The Sentence Society</h6>
                          <p style={{ fontSize: '14px' }}>By playing this game, you're helping us digitise Tigrinya and and helping your fellow Tigrinya speakers all over the world.</p>
                          <a href="https://www.thesentencesociety.org/index.html" id="game_button" outline color="secondary">PLAY GAME</a>
                        </div>
                      </Row>
                    </Form>
                    : <Button type="button" size="sm" onClick={this.improveTranslation}><MdFlag /> Improve translation</Button>}
                </div>
              </Col>
            </Row>
          </Container> :
          <Container style={{ margin: '0' }}>
            <p>English to Tigrinya</p>
            <Row>
              <Col xs={12} md={6}>

                <div>
                  <textarea type='text' id="input-field" value={display} onChange={this.englishToTigrinya} onPaste={e => console.log(e.clipboardData.getData('text'))} />
                </div>
              </Col>

              <Col xs={12} md={6}>
                <div>
                  <textarea type="text" id="input-field" value={translation} disabled />
                </div>
                <div>
                  {improveTranslation ?
                    <Form onSubmit={this.handleSubmit}>
                      <Row>
                        <Col xs={7} md={10}>

                          <Input type='text'id="correctionField"  placeholder="Type your corrections here..." value={improvedTranslation} name="improvedTranslation" onChange={(e) => { this.tigrinyaToEnglish(e); this.translateEnToTi() }} />


                        </Col>
                        <Col xs={1} md={2}>
                          <Button type="submit">Submit</Button>
                        </Col>
                        <div>
                          <h6 style={{ marginTop: '20px' }}>The Sentence Society</h6>
                          <p style={{ fontSize: '14px' }}>By playing this game, you're helping us digitise Tigrinya and and helping your fellow Tigrinya speakers all over the world.</p>
                          <a href="https://www.thesentencesociety.org/index.html" id="game_button" color="secondary">PLAY GAME</a>
                        </div>
                      </Row>
                    </Form>
                    : <Button type="button" size="sm" onClick={this.improveTranslation}><MdFlag /> Improve translation</Button>}
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

  };
};
