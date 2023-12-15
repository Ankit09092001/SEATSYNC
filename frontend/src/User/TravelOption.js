import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from './navbar';
import Train from './train.webp';
import AlternateCard from "./AlternateCard";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBCardHeader,
  MDBBtn,
} from "mdb-react-ui-kit";

function AddPassenger() {
  const location = useLocation();
  const trainData = location.state;
  // console.log(trainData.data);
//   console.log(trainData.source)
  return (
    <div>
    <Navbar />
  <header>
   

    <div
      className='p-5 text-center bg-image'
      style={{ backgroundImage: `url(${Train})`, height: '656.5px' }}
    >
      <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <div className='d-flex justify-content-center align-items-center h-100'>
          <div style={{ width: '900px', height: '600px' }}>
          
            <MDBCard className="p-4">
                <MDBCardTitle>All Possible train</MDBCardTitle>
                <MDBCardBody style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    { trainData.data.map((eachTrain)=>(
                        <AlternateCard data = {eachTrain} classType={trainData.classType} trainNo={trainData.trainNo} email={location.state.email}/>
                        
                    ))   
                    }
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

export default AddPassenger;
