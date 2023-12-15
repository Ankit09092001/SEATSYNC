import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MDBBtn, MDBNavbarLink } from "mdb-react-ui-kit";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
} from "mdb-react-ui-kit";

import Train from "./train.webp";

function PassengerForm() {
    const navigate = useNavigate()
    const location = useLocation();
    console.log(location.state.props)
    console.log(location.state.Class)
  const [passengerData, setPassengerData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPassengerData([...passengerData, formData]);
    setFormData({
      name: "",
      age: "",
      gender: "",
    });
  };

  const handleBooking =async () => {
    console.log(passengerData)
    const trainAllData = location.state.props
    const Class = location.state.Class 
    const response = await axios.post("http://localhost:8000/trainbooking/add-S-passenger", { passengerData,trainAllData,Class })
    setPassengerData([])
    alert("Booking Successful you will receive mail consist of your seat and coach number");
    navigate('/');
  };

  return (
    <div>
      <Navbar />
      <header>
        <div
          className="p-5 text-center bg-image"
          style={{ backgroundImage: `url(${Train})`, height: "656.5px" }}
        >
          <div
            className="mask"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          >
            <div className="d-flex justify-content-center px-5 align-items-center h-100">
              <div style={{ width: "500px", height: "400px" }}>
                <MDBCard className="p-4">
                  <MDBCardBody>
                    <MDBCardTitle>Enter the Details</MDBCardTitle>
                    <form onSubmit={handleSubmit}>
                      <MDBInput
                        label="Name"
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <br />
                      <MDBInput
                        label="Age"
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        required
                      />
                      <br />
                      <MDBRow className="mb-3">
                        <MDBCol>
                          <select
                            className="form-select"
                            label="Gender"
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="mb-3">
                        <MDBCol>
                          <MDBBtn type="submit">Add Passenger</MDBBtn>
                        </MDBCol>
                        <MDBCol>
                          <MDBBtn onClick={handleBooking}>Book</MDBBtn>
                        </MDBCol>
                      </MDBRow>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}


export default PassengerForm;
