import React, { Component } from 'react';
import Phonetics from './phonetics';

export default class Home extends Component {

    render() {
        return (
            <div>
                <div>
                    <p>Home</p>
                </div>
                <div>
                    <Phonetics />
                </div>
            </div>
        )
    }
}