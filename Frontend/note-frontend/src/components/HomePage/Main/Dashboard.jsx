import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import styles from "../HomePage.module.css";

function ConfirmModel() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="danger"
        onClick={handleShow}
        style={{
          position: "relative",
          left: "8rem",
        }}
      >
        Delete
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the Note?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleClose}
            style={{
              backgroundColor: "#D11A2A",
              borderColor: "#D11A2A",
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function Note(title) {
  return (
    <div className={styles.card}>
      <Card style={{ width: "18 rem" }}>
        <Card.Img
          variant="top"
          src="https://clickup.com/blog/wp-content/uploads/2020/01/note-taking.png"
        />
        <Card.Body>
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Today's Vocab</Accordion.Header>{" "}
              <Accordion.Body>
                <strong>Mellifluous</strong>: sweet or musical; pleasant to
                hear. Example: The mellifluous melody of the song captivated the
                audience.
                <br />
                <br />
                <strong>Obfuscate</strong>(verb): To deliberately make something
                unclear or difficult to understand. Example: The politician
                tried to obfuscate the issue by using complex language.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Button variant="secondary">
            <Card.Link
              href="http://localhost:3000/About"
              style={{ color: "white", textDecoration: "none" }}
            >
              Note
            </Card.Link>
          </Button>
          <ConfirmModel />
        </Card.Body>
      </Card>
    </div>
  );
}

class DashBoard extends React.Component {
  render() {
    return (
      <main className={styles.db}>
        <Note title="Today's Vocab" />
      </main>
    );
  }
}

export default DashBoard;
