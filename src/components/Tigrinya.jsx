import React from 'react';
import { Row, Col } from 'react-bootstrap';
import NavBar from './Navigation';
import image from '../assets/children.jpg';
import image2 from '../assets/prists.jpg';
import {Button} from 'reactstrap';
import Footer from './Footer';



const Tigrinya = () => {

  return (
    <div className="Tigrinya">
      <br />
      <NavBar />
      <div className="container">
      <h1>Tigrinya</h1>
      <p>Tigrinya is the official language of Eritrea and is also spoken in northern Ethiopia. There’s a rough estimate of 8 million speakers however statistics are dated. It’s an Afro-Asiatic language from the Semitic branch and uses the Ge’ez alphabet.</p>
    <Row>
        <Col md={6}>
        <h1>Why Tigrinya?</h1>
        <p>Prolonged conflict and an unsettled political climate have been damaging to the Eritrean quality of life, causing 4,000-5,000 Eritrean people fleeing their homes every month, as estimated by the UNHCR. Without a digitised language, many Eritrean people struggle with language learning, education and integration into new societies. With 500,000 Eritrean refugees in Europe alone, digitising the language will assist in communication in the refugee and migration process as well as promote inclusivity in communities beyond Northern-Africa.</p>
        <img src={image2} alt="children from Tigrinya" id="photo" />
        </Col>
        <Col md={6}>
        <img src={image} alt="children from Tigrinya" id="photo" />
        <h1>Crowd-sourced model</h1>
        <p>Travis Foundation digitises lesser resourced languages, that is, languages that don't have significant data collected around them. This means we need to create the corpus and information necessary for digitisation. But we can't do this ourselves. Our community plays a huge part in collecting, translating and providing text on various topics. We match people's skills and interests to different topics required for our language corpus and collaborate to create the data together.</p>
        </Col>
    </Row>
    <h1>Tigrinya Game</h1>
    <h2>The Sentence Society</h2>
    <p>We are creating game whereby playing, translated sentences are added to our data set. Through the contribution of Tigrinya speakers, we hope to reach 1 million sentences to digitise Tigrinya and make a good quality machine translation. By playing this game, you're helping us digitise Tigrinya and and helping your fellow Tigrinya speakers all over the world.</p>
    <a href="https://www.thesentencesociety.org/index.html"><Button outline color="secondary">PLAY GAME</Button></a>
    </div>
    <Footer />
    </div>

  );
};

export default Tigrinya;

