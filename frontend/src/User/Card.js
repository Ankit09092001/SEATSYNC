import React from 'react';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBNavbarLink
} from 'mdb-react-ui-kit';
import './card.css';
import image1 from './add_tc.jpg';
import image2 from './view_Tc.png';
import image3 from './add_train_sched.jpg';
import image4 from './view_train_sched.jpg';
export default function App() {
  return (
    <MDBRow className='row-cols-1 row-cols-md-3 g-4 p-4'>
      <MDBCol>
        <MDBCard className='h-100 card-with-hover'>
          <MDBCardImage
            src={image1}
            alt='...'
            position='top'
            className='image-fixed-size'
           
          />
          <MDBCardBody>
            <MDBCardTitle>Book Ticket</MDBCardTitle>
            <MDBCardText>
              Here user can book the new ticket.
            </MDBCardText>
            <MDBNavbarLink href='/booktrain'><MDBBtn>Open</MDBBtn></MDBNavbarLink>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100 card-with-hover'>
          <MDBCardImage
            src={image2}
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Check PNR Status</MDBCardTitle>
            <MDBCardText>Here user can check their PNR status</MDBCardText>
            <MDBNavbarLink href='#'><MDBBtn>Open</MDBBtn></MDBNavbarLink>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100 card-with-hover'>
          <MDBCardImage
            src={image3}
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>My Bookings</MDBCardTitle>
            <MDBCardText>
              Here user can view its previous bookings.
            </MDBCardText>
            <MDBNavbarLink href='#'><MDBBtn>Open</MDBBtn></MDBNavbarLink>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100 card-with-hover'>
          <MDBCardImage
            src={image4}
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Train Route</MDBCardTitle>
            <MDBCardText>
              User can check the route of train.
            </MDBCardText>
            <MDBBtn>Open</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}