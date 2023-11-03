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
            <MDBCardTitle>Add TC</MDBCardTitle>
            <MDBCardText>
            Here, the admin can add new Ticket Collectors information.
            </MDBCardText>
            <MDBNavbarLink href='/addtc'><MDBBtn>Open</MDBBtn></MDBNavbarLink>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100 card-with-hover'>
          <MDBCardImage
            src={image2}
            alt='...'
            position='top'
            // className='image-fixed-size'
          />
          <MDBCardBody>
            <MDBCardTitle>View TC</MDBCardTitle>
            <MDBCardText>The admin can view all the Ticket Collectors present.</MDBCardText>
            <MDBNavbarLink href='/viewtc'><MDBBtn>Open</MDBBtn></MDBNavbarLink>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100 card-with-hover'>
          <MDBCardImage
            src={image3}
            alt='...'
            position='top'
            // className='image-fixed-size'
          />
          <MDBCardBody>
            <MDBCardTitle>Add Train Schedule</MDBCardTitle>
            <MDBCardText>
            Here, the admin can Add the Train Schedule.
              </MDBCardText>
            <MDBNavbarLink href='/addtrain'><MDBBtn>Open</MDBBtn></MDBNavbarLink>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100 card-with-hover'>
          <MDBCardImage
            src={image4}
            alt='...'
            position='top'
            // className='image-fixed-size'
          />
          <MDBCardBody>
            <MDBCardTitle>View Train Schedule</MDBCardTitle>
            <MDBCardText>
            Here, the admin can view the Train Schedule.
            </MDBCardText>
            <MDBBtn>Open</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}