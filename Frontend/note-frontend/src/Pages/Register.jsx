import React, { useRef, useState, useEffect } from "react";
import NavBar from "../components/LoginPage/NavBar";
import {
  Form,
  Button,
  Row,
  Col,
  FormControl,
  Card,
  FormLabel,
} from "react-bootstrap";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import styles from "../components/RegisterPage/RegisterForm.module.css";

function Login() {
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const EMAILREGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validemail, setvalidemail] = useState("");
  const [emailfocus, setemailfocus] = useState("");

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user, USER_REGEX]);

  useEffect(() => {
    setvalidemail(EMAILREGEX.test(email));
  }, [email, EMAILREGEX]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd, PWD_REGEX]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  async function handleSubmit(e) {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = EMAILREGEX.test(email);
    const v3 = PWD_REGEX.test(pwd);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      await axios
        .post("http://localhost:5000/user/register", {
          name: user,
          email: email,
          password: pwd,
        })
        .then((res) => {
          console.log(res);
          if (res.data) {
            setErrMsg("Username or Email Taken");
          } else {
            setSuccess(true);
          }
          setTimeout(() => {
            setErrMsg("");
          }, 5000);
        });
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
    e.preventDefault();
  }
  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="http://localhost:3000/SignIn">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
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
                <h2>Sign Up</h2>
                <br />
                <p
                  ref={errRef}
                  className={errMsg ? styles.errmsg : styles.offscreen}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>

                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <FormLabel htmlFor="username">
                      Username:
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={validName ? styles.valid : styles.hide}
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={
                          validName || !user ? styles.hide : styles.invalid
                        }
                      />
                    </FormLabel>
                    <FormControl
                      className="mb-3"
                      id="Name"
                      ref={userRef}
                      type="name"
                      placeholder="Name"
                      value={user}
                      autoComplete="off"
                      onChange={(e) => {
                        setUser(e.target.value);
                      }}
                      required
                      onFocus={() => {
                        setUserFocus(true);
                      }}
                      onBlur={() => {
                        setUserFocus(false);
                      }}
                      aria-invalid={validName ? "false" : "true"}
                      aria-describedby="uidnote"
                    />
                    <p
                      id="uidnote"
                      className={
                        userFocus && user && !validName
                          ? styles.instructions
                          : styles.offscreen
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      4 to 24 characters.
                      <br />
                      Must begin with a letter.
                      <br />
                      Letters, numbers, underscores, hyphens allowed.
                    </p>
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
                          validPwd || !pwd ? styles.hide : styles.invalid
                        }
                      />
                    </FormLabel>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={pwd}
                      autoComplete="off"
                      onChange={(e) => {
                        setPwd(e.target.value);
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
                      Must include uppercase and lowercase letters, a number and
                      a special character.
                      <br />
                      Allowed special characters:{" "}
                      <span aria-label="exclamation mark">!</span>{" "}
                      <span aria-label="at symbol">@</span>{" "}
                      <span aria-label="hashtag">#</span>{" "}
                      <span aria-label="dollar sign">$</span>{" "}
                      <span aria-label="percent">%</span>
                    </p>
                    <br />
                    <FormLabel label="Password">
                      Confirm Password:
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={
                          validMatch && matchPwd && validPwd
                            ? styles.valid
                            : styles.hide
                        }
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={
                          validMatch || !matchPwd ? styles.hide : styles.invalid
                        }
                      />
                    </FormLabel>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={matchPwd}
                      autoComplete="off"
                      onChange={(e) => {
                        setMatchPwd(e.target.value);
                      }}
                      required
                      aria-invalid={validMatch ? "false" : "true"}
                      aria-describedby="pwdnote"
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                    />
                    <p
                      id="confirmnote"
                      className={
                        matchFocus && !validMatch
                          ? styles.instructions
                          : styles.offscreen
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Must match the first password input field.
                    </p>
                  </Form.Group>
                  <br />
                  <Card.Text>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={
                        !validName || !validPwd || !validMatch || !validemail
                          ? true
                          : false
                      }
                    >
                      Submit
                    </Button>
                  </Card.Text>
                  <Card.Text
                    style={{ display: "inline-block", margin: "10px" }}
                  >
                    Already Registed?
                  </Card.Text>
                  <Card.Link href="http://localhost:3000/SignIn">
                    Sign In
                  </Card.Link>
                </Form>
              </Col>
            </Row>
          </Card>
          {/* <Verifyuser response={verifyData} /> */}
        </section>
      )}
    </>
  );
}

export default Login;
