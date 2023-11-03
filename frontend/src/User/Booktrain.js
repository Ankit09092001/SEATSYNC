// import React from 'react';
import Navbar from "./navbar";
// import './card.css';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";

// export default function App() {
//   return (
//     <div className='card'>
//         <Navbar/>

//     </div>
//   );
// }

import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function submit(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/addtc", { email, password })
      .then((res) => {
        if (res.data == "exist") {
          alert("User already Registered");
        } else if (res.data == "notexist") {
          alert("TC Registered");

          // history("/user",{state:{id:email}})
        }
      })
      .catch((e) => {
        alert("Try Again");
        console.log(e);
      });
    setEmail("");
    setPassword("");
  }
  return (
    <div>
      <Navbar />
      <MDBCard className="p-4">
        {/* <MDBRipple
          rippleColor="light"
          rippleTag="div"
          className="bg-image hover-overlay"
        >
          <MDBCardImage
            src="https://mdbootstrap.com/img/new/standard/nature/111.webp"
            fluid
            alt="..."
            style={{ width: "300px", height: "250px" }}
          />
          <a>
            <div
              className="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
            ></div>
          </a>
        </MDBRipple> */}
        <MDBCardBody>
          <MDBCardTitle>Add New Train</MDBCardTitle>
          <form className="p-4">
            <MDBInput
              className="mb-4"
              type="text"
              id="form2Example2"
              label="Source Station"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <MDBInput
              className="mb-4"
              type="text"
              id="form2Example2"
              label="Destination Station"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <MDBInput
              className="mb-4"
              type="date"
              id="form2Example2"
              label="Date"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
                <label>Seat Type:    </label>
              <select id="seat" name="seat-type" className="custom-select">
                <option value="General">General</option>
                <option value="Tatkal">Tatkal</option>
                <option value="Premium Tatkal">Premium Tatkal</option>
               
              </select>
              <br />
              <br />
            

            <MDBBtn onClick={submit} type="submit" className="mb-4" block>
              Sign in
            </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
