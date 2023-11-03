import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter className='text-center' color='black' style={{ backgroundColor: '#e3f2fd' }}>
      <MDBContainer className='p-4'>
        <section className='mb-4'>
          <MDBBtn outline color="black" floating className='m-1' href='https://www.facebook.com/' role='button'>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn outline color="black" floating className='m-1' href='https://www.twitter.com' role='button'>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn outline color="black" floating className='m-1' href='https://www.google.com' role='button'>
            <MDBIcon fab icon='google' />
          </MDBBtn>

          <MDBBtn outline color="black" floating className='m-1' href='https://www.instagram.com' role='button'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn outline color="black" floating className='m-1' href='https://www.linkedin.com' role='button'>
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn outline color="black" floating className='m-1' href='https://www.github.com' role='button'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>

       

        <section className='mb-4'>
          <p>
        
          </p>
        </section>

        <section className=''>
          <MDBRow>

          <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className=''>About SeatSync</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='https://www.irctc.co.in/' className='text-black' target ='_blank'>
                    About us
                  </a>
                </li>
                <li>
                  <a href=' https://www.irctc.co.in/eticketing/contact.html' className='text-black' target = '_blank'>
                    Contact us
                  </a>
                </li>
               
              </ul>
            </MDBCol>

           

           

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className=''>Info</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='https://contents.irctc.co.in/en/term.html' className='text-black' >
                    Terms and Conditions
                  </a>
                </li>
                <li>
                  <a href='https://contents.irctc.co.in/en/FAQ.pdf' className='text-black' >
                    FAQ
                  </a>
                </li>
              
              
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className=''>Policies</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='https://www.irctc.co.in/' className='text-black'>
                  Train Info Enquiry Services (TIES)
                  </a>
                </li>
                <li>
                  <a href='https://contents.irctc.co.in/en/TIES_Policy.pdf' className='text-black'>
                  B2C - Start Up/ MSME
                  </a>
                </li>
               
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className=''>SeatSync Zone</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='https://contents.irctc.co.in/en/jago_yatri.pdf' className='text-black'>
                    Jago, Yatri, Jago
                  </a>
                </li>
                <li>
                  <a href='https://www.the-maharajas.com/' className='text-black'>
                    Maharaja's Express
                  </a>
                </li>
               
              </ul>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Copyright: 
        <a className='text-black' href='https://www.irctc.co.in/'>
          www.seatsync.com
        </a>
      </div>
    </MDBFooter>
  );
}