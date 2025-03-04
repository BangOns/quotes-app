import React from "react";
import "./from.css";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import upload from "./img/upload.png";
import anime1 from "./img/anime.png";
import anime2 from "./img/animeNulis.png";
import axios from "axios";
import Navbar from "../navbar/navbar";

function FormAndQuotes() {
  const [user, setUser] = useState({});
  const [nama, setNama] = useState("");
  const [text, setText] = useState("");
  const [typed, setTyped] = useState("");

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
      <Navbar />
      <div className="containerForm">
        <div className="judulForm">
          <h2>Making Quotes</h2>
        </div>
        <form className="inputForm" onSubmit={addQuotes}>
          <div className="textAreaForm">
            <textarea
              name=""
              id="area"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setTyped(e.target.value);
              }}
            ></textarea>
            {typed !== "" ? (
              <></>
            ) : (
              <>
                <h2>Type Something...</h2>
              </>
            )}
          </div>
          <div className="buttonForm">
            <div className="inputNameForm">
              <input
                type="text"
                className="textInputForm"
                placeholder="Name"
                value={nama}
                onChange={(e) => {
                  setNama(e.target.value);
                }}
              />
            </div>
            <div className="buttonSubmitForm">
              <button className="buttonsubmit">
                <div className="imageForm">
                  <img src={upload} alt="" />
                </div>
                <div className="uploadForm">
                  <p>Upload</p>{" "}
                </div>
              </button>
            </div>
          </div>
        </form>
        {width > 620 ? (
          <>
            <div className="animeImageForm">
              <img src={anime1} alt="" />
            </div>
          </>
        ) : (
          <>
            <div className="animeImageForm2">
              <img src={anime2} alt="" />
            </div>
          </>
        )}
      </div>
    </Fragment>
  );
}

export default FormAndQuotes;
// {/* <Col md={{ span: 8, offset: 2 }}>
// <Card className="cards">
//   <Card.Body>
//     <Form className="form-user" onSubmit={addQuotes}>
//       <Form.Group
//         className="mb-3"
//         controlId="exampleForm.ControlInput1"
//       >
//         <Form.Label>User</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="your name"
//           className="inputName"
//           value={nama}
//           onChange={(e) => setNama(e.target.value)}
//         />
//       </Form.Group>
//       <Form.Group
//         className="mb-3"
//         controlId="exampleForm.ControlTextarea1"
//       >
//         <Form.Label>Your Qoute's</Form.Label>
//         <Form.Control
//           as="textarea"
//           rows={3}
//           placeholder="I am ..."
//           className="inputName"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//       </Form.Group>
//       <Button variant="primary" type="submit">
//         Create Quote's
//       </Button>
//     </Form>
//   </Card.Body>
// </Card>
// </Col> */}
