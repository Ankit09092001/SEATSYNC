import { useState,useEffect } from "react";
import axios from "axios";
// import "./login.css";
import { useNavigate, Link } from "react-router-dom";
import Train from "./logintrain.webp";
import Trainicon from "./rail.png";


import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBNavbarLink
} from "mdb-react-ui-kit";

function App() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
 if(localStorage.getItem("token")){
  localStorage.removeItem("token");
 }
  
  async function submit(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/", { email, password })
      .then((res) => {
        if (res.data.status == "user") {
          localStorage.setItem("token", res.data.token);
          history("/user", { state: { id: email } });
        }else if (res.data.status == "admin") {
          localStorage.setItem("token", res.data.token);
          history("/admin", { state: { id: email } });
        }else if (res.data.status == "tc") {
          localStorage.setItem("token", res.data.token);
          history("/tc", { state: { id: email } });
        } else if (res.data.status == "notexist") {
          alert("User is not Registered");
        }
      })
      .catch((e) => {
        alert("wrong details");
        console.log(e);
      });
  }

  useEffect(() => {
    if (!isAuthenticated) {
      history("/signin"); // Redirect to the login page if not authenticated.
    }
  }, [isAuthenticated, history]);

  

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm="6">
        <MDBNavbarLink aria-current='page' href='/'>
          <div className="d-flex flex-row ps-5 pt-5 mb-8">
            <MDBIcon fas icon="train fa-3x me-3" style={{ color: "#709085" }} />
            <span className="h1 fw-bold mb-0">Seat-Sync</span>
          </div>
          </MDBNavbarLink>
          <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
            <h3
              className="fw-normal mb-3 ps-5 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              Log in
            </h3>
            <form action="POST">
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                label="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="formControlLg"
                type="password"
                size="lg"
              />

              <MDBBtn
                className="mb-4 px-5 mx-5 w-100"
                onClick={submit}
                color="info"
                size="lg"
              >
                Login
              </MDBBtn>
            </form>
            
            <p className="ms-5">
              Don't have an account?{" "}
              <a href="/signup" class="link-info">
                Register here
              </a>
            </p>
          </div>
        </MDBCol>

        <MDBCol sm="6" className="d-none d-sm-block px-0">
          <div
            className="container"
            style={{ height: "100vh", overflow: "hidden" }}
          >
            <img
              src={Train}
              alt="Login image"
              className="w-100"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "left",
              }}
            />
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
