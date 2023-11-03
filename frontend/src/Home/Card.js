// import React from 'react';
// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCardTitle,
//   MDBCardText,
//   MDBBtn
// } from 'mdb-react-ui-kit';

// export default function App() {
//   return (
//     <>
     

//       <MDBCard alignment='center'>
//         <MDBCardBody>
//           <MDBCardTitle>Welcome to SeatSync - Online Bookings Made Easy</MDBCardTitle>
//           <MDBCardText>
//             Experience a new level of convenience and flexibility in your train journeys, all at your fingertips.</MDBCardText>
//           <MDBBtn href='#'>Back to Home </MDBBtn>
//         </MDBCardBody>
//       </MDBCard>

//     </>
//   );
// }

import React, { useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';
// import './Card.css'; // Import your CSS file

export default function App() {
  const [animatedText, setAnimatedText] = useState('');
  const [textToAnimate] = useState("Experience a new level of convenience and flexibility in your train journeys, all at your fingertips.");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < textToAnimate.length) {
        setAnimatedText(textToAnimate.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50); // Adjust the timing here to control the speed of animation
  }, []);

  return (
    <>
      <MDBCard alignment='center'>
        <MDBCardBody>
          <MDBCardTitle>Welcome to SeatSync - Online Bookings Made Easy</MDBCardTitle>
          <MDBCardText>
            <span className="animated-text">{animatedText}</span>
          </MDBCardText>
          <MDBBtn href='#'>Back to Home </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </>
  );
}

