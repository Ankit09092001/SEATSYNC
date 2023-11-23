import React, { useState } from 'react';
import {
  MDBBtn,
  MDBNavbarLink
} from 'mdb-react-ui-kit';
import Train from './train.webp';
export default function App() {
  

  return (
    <header>
     

      <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: `url(${Train})`, height: '656.5px' }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>Seat-Sync</h1>
              <h4 className='mb-3'>Admin Panel</h4>
              
             
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}