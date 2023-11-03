import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";
import { MDBTable, MDBTableHead, MDBTableBody,MDBCard,MDBCardBody,MDBCardHeader } from "mdb-react-ui-kit";

export default function App() {

    const [myData, setMyData] = useState([]);
  const getApiData = async () => {
    const res = await axios.get("http://localhost:8000/tcdata");
    console.log(res.data);
    setMyData(res.data);
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <>
    <Navbar />
    <br/>
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
    </>
  );
}
