// // import React from 'react';
// import Navbar from "./navbar";
// // import './card.css';
// import {
//   MDBInput,
//   MDBCol,
//   MDBRow,
//   MDBCheckbox,
//   MDBIcon,
// } from "mdb-react-ui-kit";
// import image1 from './add_tc.jpg';

// // export default function App() {
// //   return (
// //     <div className='card'>
// //         <Navbar/>

// //     </div>
// //   );
// // }

// import React from "react";
// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCardTitle,
//   MDBCardText,
//   MDBCardImage,
//   MDBBtn,
//   MDBRipple,
// } from "mdb-react-ui-kit";
// import { useState,useEffect } from "react";
// import axios from "axios";

// export default function App() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     async function submit(e) {
//         e.preventDefault();
//         await axios.post("http://localhost:8000/addtc", { email, password }).then(res=>{
//             if(res.data=="exist"){
//                 alert("User already Registered")
                
                 
//             }
//             else if(res.data=="notexist"){
//               alert("TC Registered")
              
//                 // history("/user",{state:{id:email}})
//            }
//         })
//         .catch(e=>{
//             alert("Try Again")
//             console.log(e);
//         })
//         setEmail("");
//                 setPassword("");
//       }
//   return (
//     <div>
//       <Navbar />
//       <MDBCard className="p-4">
//         <MDBRipple
//           rippleColor="light"
//           rippleTag="div"
//           className="bg-image hover-overlay"
//         >
//           <MDBCardImage
//             src={image1}
//             fluid
//             alt="..."
//             style={{ width: "300px", height: "250px" }}
//           />
//           <a>
//             <div
//               className="mask"
//               style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
//             ></div>
//           </a>
//         </MDBRipple>
//         <MDBCardBody>
//           <MDBCardTitle>Add New Ticket Collector</MDBCardTitle>
//           <form className="p-4">
//             <MDBInput
//               className="mb-4"
//               type="email"
//               id="form2Example1"
//               label="Email address"
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//               }}
//             />
//             <MDBInput
//               className="mb-4"
//               type="password"
//               id="form2Example2"
//               label="Password"
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//               }}
//             />

//             <MDBBtn onClick={submit} type="submit" className="mb-4" block>
//               Sign in
//             </MDBBtn>
//           </form>
//         </MDBCardBody>
//       </MDBCard>
//     </div>
//   );
// }

import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import { useNavigate, Link } from "react-router-dom";
import {
  MDBBtn,
  MDBNavbarLink
} from 'mdb-react-ui-kit';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardTitle
} from "mdb-react-ui-kit";
import Train from './train.webp';
// import './card.css';
export default function App() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  async function submit(e) {
    if(email && password){
      e.preventDefault();
      await axios.post("http://localhost:8000/addtc", { email, password }).then(res=>{
          if(res.data=="exist"){
              alert("User already Registered")
              
               
          }
          else if(res.data=="notexist"){
            alert("TC Registered")
            
              // history("/user",{state:{id:email}})
         }
      })
      .catch(e=>{
          alert("Try Again")
          console.log(e);
      })
      setEmail("");
              setPassword("");
    }
    }

    useEffect(() => {
      if (!isAuthenticated) {
        history("/signin"); // Redirect to the login page if not authenticated.
      }
    }, [isAuthenticated, history]);

  return (
    <div>
      <Navbar />
    <header>
     

      <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: `url(${Train})`, height: '656.5px' }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-left px-5 align-items-center h-100'>
            <div style={{ width: '500px', height: '400px' }}>
            
              <MDBCard className="p-4">
       
        <MDBCardBody>
          <MDBCardTitle>Add New Ticket Collector</MDBCardTitle>
          <form className="p-2" required>
            <MDBInput
              className="mb-4"
              type="email"
              id="form2Example1"
              label="Email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <MDBInput
              className="mb-4"
              type="password"
              id="form2Example2"
              label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />

            <MDBBtn onClick={submit} type="submit" className="mb-4" block>
              Add
            </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard> 
             
            </div>
          </div>
        </div>
      </div>
    </header>
    </div>
  );
}