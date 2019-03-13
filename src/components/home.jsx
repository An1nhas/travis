import React from 'react';
import Navigation from './Navigation';
import Phonetics from './phonetics';
// eslint-disable-next-line
import Display from './Display';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="Homepage">
      <br />
      <Navigation />
      <div className="container">
        {/* <p style={{ fontFamily: 'Patua One' }}>ljc,hjcghgcx,hgcx,hxhx</p> */}
      </div>
      <div>
       { /*<Phonetics />*/}
      </div>
      <div>
        <Display />
      </div>
      <Footer />
    </div>

  );
};

export default Home;
