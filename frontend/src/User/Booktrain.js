import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import {
  MDBBtn,
  MDBNavbarLink
} from 'mdb-react-ui-kit';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardTitle
} from "mdb-react-ui-kit";
import Train from './train.webp';
// import './card.css';


export default function App() {
  const history = useNavigate();
  const location = useLocation();
  console.log(location.state.email)
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  async function submit(e) {
      e.preventDefault();
      console.log(source);
      console.log(destination);
      console.log(date);
      const searchData = {
        source : source,
        destination : destination,
        date : date
      }
    if(source && destination && date){
    //   e.preventDefault();
      const response = await axios.post("http://localhost:8000/trainbooking/searchRoute", { source , destination , date })
       console.log(response.data.length)
       if(response.data.length === 0){
         alert('No Train Found for this path')
       }
       else{
         history("/addpassenger",{ state: { data: response.data,source: source,destination:destination, email:location.state.email } })
       }
        setSource("")
        setDestination("")
        setDate("")
    }
    }

    useEffect(() => {
      if (!isAuthenticated) {
        history("/signin"); // Redirect to the login page if not authenticated.
      }
    }, [isAuthenticated, history]);

  return (
    <div>
      <Navbar />
    <header>
     

      <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: `url(${Train})`, height: '656.5px' }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-left px-5 align-items-center h-100'>
            <div style={{ width: '500px', height: '400px' }}>
            
              <MDBCard className="p-4">
       
        <MDBCardBody>
          <MDBCardTitle>Enter the Details</MDBCardTitle>
          <form className="p-4">
            <MDBInput
              className="mb-4"
              type="text"
              id="form2Example2"
              label="Source Station"
              value={source}
              onChange={(e) => {
                setSource(e.target.value);
              }}
            />

            <MDBInput
              className="mb-4"
              type="text"
              id="form2Example2"
              label="Destination Station"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
            />

            <MDBInput
              className="mb-4"
              type="date"
              id="form2Example2"
              label="Date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
               
              
            

            <MDBBtn onClick={submit} type="submit" className="mb-4" block>
              Search
            </MDBBtn>
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