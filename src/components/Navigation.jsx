import React, { Component } from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink, NavItem } from 'reactstrap';
import { FaBars } from 'react-icons/fa';
import logo from '../assets/logo_black.png';


export default class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  toggle() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  render() {
    const { isOpen } = this.state;
    return (

      <div className="Navbar">
        <Navbar color="light" expand="md" >
          <NavbarBrand href="https://travis.foundation"><img src={logo} alt="Travis Foundation Logo" id="logo" /></NavbarBrand>
          <NavbarToggler onClick={this.toggle}><FaBars style={{ color: 'darkgray', fontSize: '40px', float: 'right' }} /></NavbarToggler>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="ml-auto">
                <NavLink href="/"><Button outline color="secondary">Home</Button></NavLink>
              </NavItem>
              <NavItem className="ml-auto">
                <NavLink href="/about"><Button outline color="secondary">About</Button></NavLink>
              </NavItem>
              <NavItem className="ml-auto">
                <NavLink href="/Tigrinya"><Button outline color="secondary">Tigrinya</Button></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>

    );
  }

}




