import React from 'react';
import { Row, Col } from 'react-bootstrap';
import NavBar from './Navigation';
import image from '../assets/team.jpg';
import Footer from './Footer';



const About = () => {

  return (
    <div className="About">
      <br />
      <NavBar />
      <div className="container">
        <div id="Title">
          <h1>About Travis Foundation</h1>
        </div>
        <p>Travis Foundation is a non-profit organisation that digitises lesser-resourced languages, enabling communication for people in the most challenging circumstances. By compiling digital corpora, applying machine learning technology and collaborating on communication tools, we can help refugees, migrants and people in need communicate.</p>
        <Row>
          <Col md={6}>
            <h1>Mission</h1>
            <p>To bridge language barriers where it’s needed most. We want to make communication a possibility in the most challenging circumstances, so that understanding, education and change can be achieved.</p>
            <br />
            <h1>Vision</h1>
            <p>We envisage a world where language hold no barriers. A world in which someone can visit a doctor, meet a lawyer or talk to a municipality and feel at ease. A world where direct communication exists between everyone, where everyone understands and can be understood.</p>
          </Col>
          <Col md={6}>
            <img src={image} alt="Team Travis" id="photo"/>
          </Col>
        </Row>
        <h1 id="Title">What we do</h1>
        <Row>
          <Col md={4}>
            <img alt="WRITE ME" src="https://travis.foundation/wp-content/uploads/2019/02/chat1.png" style={{ width: '80px' }} />
            <h2 className="sub_title">Collaborate for communication tools</h2>
            <p>Whether a phrase book or a translation app, accessible and innovative tools support critical, community and learning based conversation.</p>
          </Col>
          <Col md={4}>
            <img alt="WRITE ME" src="https://travis.foundation/wp-content/uploads/2019/02/docs1.png" style={{ width: '80px' }} />
            <h2 className="sub_title">Compile digital corpora</h2>
            <p>We crowdsource and bring data of lesser-resourced languages together in creative ways. This ensures the continuous digital development of languages.</p>
          </Col>
          <Col md={4}>
            <img alt="WRITE ME" src="https://travis.foundation/wp-content/uploads/2019/02/brain1.png" style={{ width: '80px' }} />
            <h2 className="sub_title">Apply machine learning technology</h2>
            <p>Language corpora have impactful possibilities. We use them to create machine translations that enable communication in new areas.</p>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>

  );
};

export default About;

