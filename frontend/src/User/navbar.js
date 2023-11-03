import React from 'react';
import {
  MDBBtn,
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
        <MDBNavbarBrand><MDBNavbarLink href='/user'>SEAT-SYNC</MDBNavbarLink></MDBNavbarBrand>
        
       
            <MDBNavbarItem className='d-flex w-auto mb-3'>
              <MDBNavbarLink href='http://localhost:3000/signin'><MDBBtn color='danger'>Logout</MDBBtn></MDBNavbarLink>
            </MDBNavbarItem>
      </MDBContainer>
    </MDBNavbar>
    

  );
}