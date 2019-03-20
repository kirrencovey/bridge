import React, { Component } from "react"
import "./nav.css"
import "bootstrap/dist/css/bootstrap.min.css"

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap'

class Navigation extends Component {


  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }




  logout = () => {
    sessionStorage.clear("credentials")
    this.props.setAuth()
  }

  render() {
    return (


              <Navbar color="light" light sticky="top" expand="md" >
                <NavbarBrand href="/">bridge!</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="/animals">Animals</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/behaviors">Behaviors</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/sessions">Training History</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/" onClick={this.logout}>Logout</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
          )
        }
      }


export default Navigation
