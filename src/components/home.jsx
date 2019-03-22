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
        <div>
          <Phonetics />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
