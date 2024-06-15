import React, { useState, useEffect, useMemo } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  FormControl,
  Card,
  FormLabel,
} from "react-bootstrap";
import axios from "axios";
import NavBar from "../components/LoginPage/NavBar";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../components/RegisterPage/RegisterForm.module.css";

function CheckValidity(props) {
  console.log(props.Valid);
  if (!props.Valid) {
    return <p></p>;
  } else {
    return <p>User Present</p>;
  }
}
function Login() {
  const [email, setEmail] = useState("");
  const [validemail, setvalidEmail] = useState(false);
  const [emailfocus, setemailfocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [data, setData] = useState("");

  const EMAILREGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  useEffect(() => {
    setvalidEmail(EMAILREGEX.test(email));
  }, [email,EMAILREGEX]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
  }, [password,PWD_REGEX]);

  async function handleSubmit(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("Email:", email, "Password:", password);
    setEmail("");
    setPassword("");
  }

  return (
    <>
      <NavBar />
      <Card
        style={{
          width: "40rem",
          position: "relative",
          left: "25rem",
          top: "8rem",
          border: "none",
        }}
      >
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h2>Login</h2>
            <br />
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <FormLabel>
                  Email
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validemail ? styles.valid : styles.hide}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={
                      validemail || !email ? styles.hide : styles.invalid
                    }
                  />
                </FormLabel>
                <FormControl
                  className="mb-3"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  autoComplete="off"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                  onFocus={() => {
                    setemailfocus(true);
                  }}
                  onBlur={() => {
                    setemailfocus(false);
                  }}
                  aria-invalid={validemail ? "false" : "true"}
                  aria-describedby="uidemail"
                />
                <p
                  id="uidemail"
                  className={
                    emailfocus && email && !validemail
                      ? styles.instructions
                      : styles.offscreen
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="period">.</span>{" "}
                  <span aria-label="underscore">_</span>{" "}
                  <span aria-label="percent">%</span>
                  <br />
                  Domain Name should at least be 2 characters and can only
                  contain lower case english alphabets
                </p>
                <FormLabel label="Password">
                  Password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPwd ? styles.valid : styles.hide}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={
                      validPwd || !password ? styles.hide : styles.invalid
                    }
                  />
                </FormLabel>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  autoComplete="off"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd
                      ? styles.instructions
                      : styles.offscreen
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>
              </Form.Group>
              <br />
              <Card.Text>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Card.Text>
              <Card.Text style={{ display: "inline-block", margin: "10px" }}>
                No account?
              </Card.Text>
              <Card.Link href="http://localhost:3000/Register">
                Register
              </Card.Link>
            </Form>
          </Col>
        </Row>
        <CheckValidity Valid={data} />
      </Card>
    </>
  );
}

export default Login;
