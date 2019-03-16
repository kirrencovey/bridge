import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./nav.css"
import "bootstrap/dist/css/bootstrap.min.css"

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap'

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
    this.props.history.push("/")
  }

  render() {
    return (


              <Navbar color="light" light fixed sticky="top" expand="md" >
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
                      <NavLink href="/sessions" onClick={this.logout}>Logout</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
          );
        }
      }


      // <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow">
      //   <ul className="nav nav-pills">
      //     <li className="nav-item">
      //       <Link className="nav-link" to="/">Home</Link>
      //     </li>
      //     <li className="nav-item">
      //       <Link className="nav-link" to="/animals">Animals</Link>
      //     </li>
      //     <li className="nav-item">
      //       <Link className="nav-link" to="/behaviors">Behaviors</Link>
      //     </li>
      //     <li className="nav-item">
      //         <Link className="nav-link" to="/sessions">History</Link>
      //     </li>
        // <button
        //   type="button"
        //   className="btn btn-outline-light"
        //   onClick={this.logout}>
        //   Logout
        // </button>
      //   </ul>
      // </nav>
//     )
//   }
// }

export default Navigation
