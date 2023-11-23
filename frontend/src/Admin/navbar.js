import React,{useState} from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink
} from 'mdb-react-ui-kit';
import {
  
  
  MDBIcon,
  MDBNavbarNav,
  
 
  MDBNavbarToggler,

  MDBCollapse
} from 'mdb-react-ui-kit';

export default function App() {
  const [showNavColor, setShowNavColor] = useState(false);
  const [showNavColorSecond, setShowNavColorSecond] = useState(false);
  const [showNavColorThird, setShowNavColorThird] = useState(false);
  return (
   
    <MDBNavbar expand='lg' light style={{ backgroundColor: '#e3f2fd' }}>
      <MDBContainer fluid>
        <MDBNavbarBrand><MDBNavbarLink href='/admin'>SEAT-SYNC</MDBNavbarLink></MDBNavbarBrand>
        <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavColorThird(!showNavColorThird)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavColorThird} navbar>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
              <MDBNavbarItem className='active'>
                <MDBNavbarLink aria-current='page' href='/addtc'>
                  Add TC
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/viewtc'>View TC</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/addtrain'>Add Train</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>View Train</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem className="ms-auto">
              <MDBNavbarLink href='http://localhost:3000/signin'><MDBBtn color='danger'>Logout</MDBBtn></MDBNavbarLink>
            </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
       
            
     {/* </MDBContainer> */}
    </MDBNavbar>
    

  );
}