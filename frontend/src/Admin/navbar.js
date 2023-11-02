import React from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink
} from 'mdb-react-ui-kit';

export default function App() {
  return (
   
    <MDBNavbar expand='lg' light style={{ backgroundColor: '#e3f2fd' }}>
      <MDBContainer fluid>
        <MDBNavbarBrand>SEAT-SYNC</MDBNavbarBrand>
        
        <MDBNavbarItem className='d-flex w-auto mb-3'>
              <MDBNavbarLink href='http://localhost:3000/signin'><b>Logout</b></MDBNavbarLink>
            </MDBNavbarItem>
      </MDBContainer>
    </MDBNavbar>
    

  );
}