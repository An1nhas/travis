import React, { Component } from 'react';
import {Row, Col} from 'reactstrap';
import { FaLinkedin, FaTwitter, FaFacebook, FaEnvelope, FaInstagram } from 'react-icons/fa';
import partner1 from '../assets/cic.png';
import partner2 from '../assets/lemat.jpg';
import partner3 from '../assets/q42.jpg';
import partner4 from '../assets/sidn.jpg';
import partner5 from '../assets/travis.png';
import partner6 from '../assets/wiki_tongs.jpg';



export default class Footer extends Component {

  render() {
    
    return (

      <div className="Footer">
      <div className="container">
     <h3 style={{marginBottom: '80px'}}>Partners</h3>
     <Row>
            <Col md={2} xs={4}>
            <img src={partner1} className="logo" alt="logo" />
            </Col>
            <Col md={2} xs={4}>
            <img src={partner2} className="logo" alt="logo" />
            </Col>
            <Col md={2} xs={4}>
            <img src={partner3} className="logo" alt="logo" />
            </Col>
            <Col md={2} xs={4}>
            <img src={partner4} className="logo" alt="logo" />
            </Col>
            <Col md={2} xs={4}>
            <img src={partner5} className="logo" alt="logo" />
            </Col>
            <Col md={2} xs={4}>
            <img src={partner6} className="logo" alt="logo" />
            </Col>
         </Row>
     <Row>
         <Col md={{ size: 4, offset: 1}}>
         <h3>Contact US</h3>
         <p><a href="mailto:hello@travis.foundation" style={{color: 'black'}}><FaEnvelope /> hello@travis.foundation</a></p>
         <Row className="justify-content-center">
             <Col sm={2}>
             <a href="https://www.facebook.com/groups/2094271350851154/" style={{fontSize:'28px', textAlign:'center'}}><FaFacebook /></a>
             </Col>
             <Col sm={2}>
             <a href="https://www.linkedin.com/company/travisfoundation/" style={{fontSize:'28px', textAlign:'center'}}><FaLinkedin /></a>
             </Col>
             <Col sm={2}>
             <a href="https://twitter.com/travis_fdn" style={{fontSize:'28px', textAlign:'center'}}><FaTwitter /></a>
             </Col>
             <Col sm={2}>
             <a href="https://mysocialmate.com/u/travis.foundation" style={{fontSize:'28px', textAlign:'center'}}><FaInstagram /></a>
             </Col>
         </Row>
         </Col>
         <Col md={{size: 4, offset: 1}}>
         <h3>Drop By</h3>
         <p>Groot Handels Gebow</p>
         <p> Stationplein 45, 4th Floor, 3013 AK Rotterdam, South Holland</p>
         </Col>
     </Row>
     </div>
      </div>

    );
  }

}