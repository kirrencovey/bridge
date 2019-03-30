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

class Footer extends Component {

  render() {
    return (
        <React.Fragment>

              <Navbar id="footer" color="light" light sticky="bottom" expand="md" >
                <NavbarBrand id="footerTitle" href="/">bridge!</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink id="contact" href="/contact">contact</NavLink>
                    </NavItem>
                </Nav>
              </Navbar>

{/* <footer class="footer">
  <div class="container">
    <span class="text-muted">Place sticky footer content here.</span>
  </div>
</footer> */}

        </React.Fragment>
        )
    }
}


export default Footer
