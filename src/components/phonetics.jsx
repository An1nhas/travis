/* eslint-disable no-console */
import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';


export default class Phonetics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            english: '',
            dict: {},
            queue: '',
            finalizedSymbols: '',
            display: '',
            translation: '',
            improvedTranslation: '',
            TigrinyaToEnglish: true,
            improveTranslation: false
        }
        this.improveTranslation = this.improveTranslation.bind(this);
        this.improveChangeHandler = this.improveChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchTranslations = this.switchTranslations.bind(this);
        this.englishToTigrinya = this.englishToTigrinya.bind(this);
    };

    componentWillMount() {
        axios.get('http://localhost:8080/api/lang').then(response => this.setState({ dict: response.data }));
    }

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

        if (/[^a-zNKQHPCTZOK2]/.test(e.nativeEvent.data)) {
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


    render() {

        const { display, translation, TigrinyaToEnglish, improveTranslation, improvedTranslation } = this.state;
        return (
            <Container>
                <button type="button" onClick={this.switchTranslations}>Switch</button>
                {TigrinyaToEnglish ?
                    <Row>
                        <Col md={6} lg={6}>
                            <p>Translate from Tigrinya to English</p>
                            <div>
                                <input type='text' value={display} onChange={(e) => this.tigrinyaToEnglish(e)} />
                            </div>
                        </Col>

                        <Col md={6} lg={6}>
                            <div>
                                <p>{translation}</p>
                            </div>
                            <div>
                                {improveTranslation ?
                                    <form onSubmit={this.handleSubmit}>
                                        <input type='text' value={improvedTranslation} onChange={this.improveChangeHandler} />
                                        <button type="submit">Submit</button>
                                    </form>
                                    : <button type="button" onClick={this.improveTranslation}>Improve translation</button>}
                            </div>
                        </Col>
                    </Row> :

                    <Row>
                        <Col md={6} lg={6}>
                            <p>Translate from English to Tigrinya</p>
                            <div>
                                <input type='text' value={display} onChange={this.englishToTigrinya} />
                            </div>
                        </Col>

                        <Col md={6} lg={6}>
                            <div>
                                <p>{translation}</p>
                            </div>
                            <div>
                                {improveTranslation ?
                                    <form onSubmit={this.handleSubmit}>
                                        <input type='text' value={improvedTranslation} onChange={this.improveChangeHandler} />
                                        <button type="submit">Submit</button>
                                    </form>
                                    : <button type="button" onClick={this.improveTranslation}>Improve translation</button>}
                            </div>
                        </Col>
                    </Row>}
            </Container>

        );
    };
};