import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container"; // import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class NavBar extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="dark" >
          <Container>
            <Navbar.Brand>
              <Nav.Link href = "http://localhost:3000/">
                <img
                  src="https://png.pngtree.com/png-vector/20190428/ourmid/pngtree-vector-notes-icon-png-image_992313.jpg"
                  width="40"
                  height="40"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
              </Nav.Link>
            </Navbar.Brand>
          </Container>
          <Nav.Link>
            <Image
              src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
              roundedCircle
              height="40px"
              width="40px"
              className="d-inline-block align-top"
              alt="User Logo"
            />
          </Nav.Link>
        </Navbar>
      </>
    );
  }
}

export default NavBar;
