import React from 'react';
import Navigation from './Navigation';
import Phonetics from './phonetics';
// eslint-disable-next-line
import Display from './Display';
import Footer from './Footer';
import {Button} from 'reactstrap';

const Home = () => {
  return (
    <div className="Homepage">
      <br />
      <Navigation />
      <div className="container">
        {/* <p style={{ fontFamily: 'Patua One' }}>ljc,hjcghgcx,hgcx,hxhx</p> */}
    
      <div>
        <Phonetics />
      </div>
      <Footer />
    </div>
</div>
  );
};

export default Home;
