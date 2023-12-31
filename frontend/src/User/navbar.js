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
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location.state.email)
  const [showNavColor, setShowNavColor] = useState(false);
  const [showNavColorSecond, setShowNavColorSecond] = useState(false);
  const [showNavColorThird, setShowNavColorThird] = useState(false);
  function handleBooktrain(){
      navigate("/booktrain",{state:{email: location.state.email}})
  }
  function handleAlternateBooktrain(){
    navigate("/alternatebooking",{state:{email: location.state.email}})
}

  return (
   
    <MDBNavbar expand='lg' light style={{ backgroundColor: '#e3f2fd' }}>
      <MDBContainer fluid>
        <MDBNavbarBrand><MDBNavbarLink href='/user'>SEAT-SYNC</MDBNavbarLink></MDBNavbarBrand>
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
                <MDBNavbarLink aria-current='page' onClick={handleBooktrain}>
                  Ticket Booking
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink onClick={handleAlternateBooktrain}>Alternate Booking</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>PNR Status</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>Train Route</MDBNavbarLink>
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