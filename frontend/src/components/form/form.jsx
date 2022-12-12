import Form from "react-bootstrap/Form";
import React from "react";
import "./from.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

function FormAndQuotes() {
  const [user, setUser] = useState({});
  const [nama, setNama] = useState("");
  const [text, setText] = useState("");

  const [width, setWidth] = useState(window.innerWidth);
  function handleWidth() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWidth);
  }, [width]);

  function addQuotes(e) {
    e.preventDefault();
    let date = new Date().getTime();
    let newData = {
      id: date,
      quote: text,
      user: nama,
    };
    console.log(newData);
    setUser(newData);
    setNama("");
    setText("");
  }

  async function getPostUser() {
    await window.location.reload();
    let response = await axios.post("http://localhost:5000/quote", user);
    return response;
  }
  useEffect(() => {
    document.title = "Quotes App";
    if (user.user && user.quote) {
      getPostUser();
    }
  }, [user]);
  return (
    <Fragment>
      <Container>
        <Row className="margin">
          {width <= 900 ? (
            <>
              <Col md={{ span: 8, offset: 2 }}>
                <Card className="cards">
                  <Card.Body>
                    <Form className="form-user" onSubmit={addQuotes}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>User</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="your name"
                          className="inputName"
                          value={nama}
                          onChange={(e) => setNama(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Your Qoute's</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="I am ..."
                          className="inputName"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Create Quote's
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </>
          ) : (
            <>
              <Col md={{ span: 6, offset: 3 }}>
                <Card className="cards">
                  <Card.Body>
                    <Form className="form-user" onSubmit={addQuotes}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>User</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="your name"
                          className="inputName"
                          value={nama}
                          onChange={(e) => setNama(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Your Qoute's</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="I am ..."
                          className="inputName"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Create Quote's
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </Fragment>
  );
}

export default FormAndQuotes;
