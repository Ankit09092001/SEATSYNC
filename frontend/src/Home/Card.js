import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <>
     

      <MDBCard alignment='center'>
        <MDBCardBody>
          <MDBCardTitle>Special title treatment</MDBCardTitle>
          <MDBCardText>With supporting text below as a natural lead-in to additional content.</MDBCardText>
          <MDBBtn href='#'>Go somewhere</MDBBtn>
        </MDBCardBody>
      </MDBCard>

    </>
  );
}