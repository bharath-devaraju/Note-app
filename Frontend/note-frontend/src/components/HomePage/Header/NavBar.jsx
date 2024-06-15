import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container"; // import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class NavBar extends React.Component {
  render() {
    return (
      <>
        <Navbar bg = "dark">
          <Container>
            <Navbar.Brand>
              <img
                src="https://png.pngtree.com/png-vector/20190428/ourmid/pngtree-vector-notes-icon-png-image_992313.jpg"
                width="40"
                height="40"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link style = {{color : "white"}}>Home</Nav.Link>
              <Nav.Link style = {{color : "white"}}>About</Nav.Link>
              <Nav.Link href = "http://localhost:3000/Register" style = {{color : "white"}}>Register</Nav.Link>
            </Nav>
            </Container>
            <Container>
            <Dropdown data-bs-theme = "dark">
              <Dropdown.Toggle variant="info" id="dropdown-basic">
                Settings
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Preferences</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Log Out</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Action 3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
          <Container>
            <Button variant = "success">Add Note</Button>
          </Container>
          <Container>
            <Form inline>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Note Title"
                    className=" mr-sm-2"
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit">Seach</Button>
                </Col>
              </Row>
            </Form>
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
