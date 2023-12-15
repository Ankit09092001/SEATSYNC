import React from 'react';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBCardHeader,
  MDBBtn
} from 'mdb-react-ui-kit';
import { useNavigate, Link } from "react-router-dom";

export default function App(props) {
  // console.log(props)
  const navigate = useNavigate()

  function handleSleeper(){
    if(props.data.SleeperSeat === 0){
      alert('No Direct Seat Available check for alternate options.')
    }
    else{
      navigate("/alternateform",{state : {props:props,Class: "sleeper" }})
    }
  }
  function handleAC(){
    if(props.data.ACSeat === 0){
      alert('No Seat Available check for Emergency options.')
    }
    else{
      navigate("/alternateform",{state : {props:props,Class: "ac" }})
    }
  }

  return (
    <div>
      <MDBCard background='dark' className='text-white'>
        <MDBCardHeader>{props.data.trainName}  ( {props.data.trainNo} )</MDBCardHeader>
        <MDBCardBody>
        <div>
      {/* First Row */}
      <MDBRow className='mb-'>
        <MDBCol md='4' className='mb-3'>
          <div className='p- text-uppercase fw-bold'>{props.data.sourceStation}<br /><p>{props.data.startTime}</p></div>
        </MDBCol>
        <MDBCol md='4' className='mb-3'>
          <div className='p- '>- - - -  - - - -</div>
        </MDBCol>
        <MDBCol md='4' className='mb-3'>
          <div className='p- text-uppercase fw-bold'>{props.data.destinationStation}<br /><p>{props.data.endTime}</p></div>
        </MDBCol>
      </MDBRow>

      {/* Second Row */}
      <MDBRow className='justify-content-center'>
        <MDBCol md='2' className='mb-3  text-dark'>
          <div className='p-1  border bg-light rounded-3'>
           <p className='mb-0 fw-bold'>Sleeper</p>
           <p className='mb-1'>Avl-{props.data.SleeperSeat}</p>
           <MDBBtn onClick={handleSleeper}>Book</MDBBtn>
          </div>
        </MDBCol>
        <MDBCol md='1' className='mb-3'></MDBCol>
        <MDBCol md='2' className='mb-3 text-dark'>
          <div className='p-1  border bg-light rounded-3'>
           <p className='mb-0 fw-bold'>AC</p>
           <p className='mb-1'>Avl-{props.data.ACSeat}</p>
           <MDBBtn onClick={handleAC}>Book</MDBBtn>
          </div>
        </MDBCol>
        
      </MDBRow>
    </div>
        </MDBCardBody>
      </MDBCard>
      <br />
    </div>
  );
}