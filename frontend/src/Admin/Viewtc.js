// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "./navbar";
import { MDBTable, MDBTableHead, MDBTableBody,MDBCardHeader } from "mdb-react-ui-kit";

// export default function App() {

  //   const [myData, setMyData] = useState([]);
  // const getApiData = async () => {
  //   const res = await axios.get("http://localhost:8000/tcdata");
  //   console.log(res.data);
  //   setMyData(res.data);
  // };

  // useEffect(() => {
  //   getApiData();
  // }, []);

//   return (
//     <>
//     <Navbar />
//     <br/>
    // <MDBCard alignment='center'>
    // <MDBCardHeader>List of All Ticket Collectors</MDBCardHeader>
    // <MDBCardBody>
    // <MDBTable>
    //   <MDBTableHead dark>
    //     <tr>
    //       <th scope="col">Sr.No</th>
    //       <th scope="col">Email</th>
    //       <th scope="col">Password</th>
    //     </tr>
    //   </MDBTableHead>
    //   <MDBTableBody>
    //   {myData.map((tc) => {
    //         const {  email, password } = tc;
    //         return (
    //           <tr >
    //             <td>1</td>
    //             <td>{email}</td>
    //             <td>{password}</td>
    //           </tr>
    //         );
    //       })}
       
    //   </MDBTableBody>
    // </MDBTable>
    // </MDBCardBody>
    // </MDBCard>
//     </>
//   );
// }

import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import { useNavigate, Link } from "react-router-dom";
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [myData, setMyData] = useState([]);
  const getApiData = async () => {
    const res = await axios.get("http://localhost:8000/tcdata");
    console.log(res.data);
    setMyData(res.data);
  };

  useEffect(() => {
    getApiData();
  }, []);


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
            <div style={{ width: '600px', height: '400px' }}>
            
             
       
              <MDBCard alignment='center'>
    <MDBCardHeader>List of All Ticket Collectors</MDBCardHeader>
    <MDBCardBody>
    <MDBTable>
      <MDBTableHead dark>
        <tr>
          <th scope="col">Sr.No</th>
          <th scope="col">Email</th>
          <th scope="col">Password</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {myData.map((tc) => {
            const {  email, password } = tc;
            return (
              <tr >
                <td>1</td>
                <td>{email}</td>
                <td>{password}</td>
              </tr>
            );
          })}
       
      </MDBTableBody>
    </MDBTable>
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