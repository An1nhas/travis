import React, { Component } from 'react';
import Navigation from './Navigation';
import Phonetics from './phonetics';
// eslint-disable-next-line
import Display from './Display';

export default class Home extends Component {

  render() {

    return (
      <div className="Homepage">
        <br />
        <Navigation />
        <div className="container">
          {/* <p style={{ fontFamily: 'Patua One' }}>ljc,hjcghgcx,hgcx,hxhx</p> */}
        </div>
        <div>
          <Phonetics />
        </div>
        {/* <div>
          <Display />
        </div> */}
      </div>

    );
  }
};
