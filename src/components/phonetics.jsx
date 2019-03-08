/* eslint-disable no-console */
import React, { Component } from 'react';
import axios from 'axios';

export default class Phonetics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            english: '',
            dict: {},
            queue: '',
            finalizedSymbols: '',
            display: ''
        }
    };

    componentWillMount() {
        axios.get('http://localhost:8080/api/lang').then(response => this.setState({ dict: response.data }));

        // const test = /(([^KkghQq]u)|([A-z][A-z]i)|[aeoWA])$/;
        // console.log("REGEX")
        // console.log(test.test("kih"));
        // console.log(test.test("Kui"));
        // console.log(test.test("A"));
        // console.log(test.test("hie"));

        // const obj = { alan: 4, moni: 3, seba: 22 };
        // eslint-disable-next-line dot-notation
        // console.log(obj['alan']);
    }

    // Most recent status:
    // -- words that don't work: 'hu' (because 'hua' is also an option) (Fix: in case length===3 if [A-z]u isn't followed by 'a' add 'hu' + 'a' to the queue)
    // -- similarly: 'gui' (because 'guie' is also an option) and several similar
    // -- the same two letters in a row: e.g. trying to write 'k' followed by 'ki' breakes the function (fix this in the case length===2)
    changeHandler(e) {
        const { finalizedSymbols, queue, english, dict } = this.state;
        const stoppers = /(([^KkghQq]u)|[aeoAW])$/;
        const newEnglish = english.concat(" ", e.nativeEvent.data);

        const updatedQueue = queue.concat(e.nativeEvent.data);
        console.log("Stopper test: ", stoppers.test(updatedQueue), " Queue is: ", updatedQueue);

        if (stoppers.test(queue.concat(e.nativeEvent.data))) {

            const finalSymbol = dict[updatedQueue];
            console.log("Added in final form:", finalSymbol, " ", updatedQueue);

            this.setState({ queue: '', finalizedSymbols: finalizedSymbols.concat(finalSymbol), display: finalizedSymbols.concat(finalSymbol), english: newEnglish })
        } else if (updatedQueue.length === 1) {
            console.log("Queue len == 1", dict[updatedQueue])
            this.setState({ display: finalizedSymbols.concat(dict[updatedQueue]), queue: updatedQueue, english: newEnglish })
        } else if (updatedQueue.length === 2) {
            console.log("Queue len == 2", dict[updatedQueue])
            this.setState({ display: finalizedSymbols.concat(dict[updatedQueue]), queue: updatedQueue, english: newEnglish })
        } else if (updatedQueue.length === 3) {
            const iTest = /[A-z]i[A-z]/;
            if (iTest.test(updatedQueue)) {
                this.setState({ queue: updatedQueue.slice(0, -1), finalizedSymbols: finalizedSymbols.concat(dict[queue]), english: newEnglish, display: finalizedSymbols.concat(dict[queue]).concat(dict[e.nativeEvent.data]) })
                console.log("Added in final form:", dict[queue], " ", queue);

            } else {
                console.log("ENDED UP IN LENGTH THREE")
                this.setState({ display: finalizedSymbols.concat(dict[updatedQueue]), queue: updatedQueue, english: newEnglish })

            }
        } else if (updatedQueue.length === 4) {
            const iTest = /[A-z][A-z]i[^e]/;
            if (iTest.test(updatedQueue)) {
                console.log("HERE")
                this.setState({ queue: updatedQueue.slice(0, -1), finalizedSymbols: finalizedSymbols.concat(dict[queue]), english: newEnglish, display: finalizedSymbols.concat(dict[queue]).concat(dict[e.nativeEvent.data]) })
                console.log("Added in final form:", dict[queue], " ", queue);

            } else {
                console.log("ENDED UP IN LENGTH FOUR")

            }
        }

        console.log(newEnglish);
        // Regex for e, u, a, o
        // if FALSE that then it's a new symbol.    UNLESS IT'S 'i'
        // provisional goes to the final string
        // the newest letter goes to the queue
        // there's a new provisional
        // If TRUE than current symbol updates
        // the updated symbol is added to finalizedSymbols
        // provisionalSymbol is again an empty string



        // this.setState({ before: before.concat(e.nativeEvent.data), after: e.target.value });
        // console.log("Last keypress: ", e.nativeEvent.data);
        // console.log("After, visible input field:", this.state.);
        // console.log(dict[e.target.value]);
    }

    render() {

        const { display, dict } = this.state;
        console.log("DICT: ", dict);

        return (
            <div>
                <input type='text' value={display} onChange={(e) => this.changeHandler(e)} />
            </div>
        )
    }
};