import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">

      <div className="grid">
        <div className="grid-col grid-col_8">
          <h1 className='landTitle'>Welcome to Nature Nook</h1>
          <p className='landContent'>
            Discover the joy of nurturing your own green oasis with Nature Nook. Immerse yourself in a world where plant lovers unite to share their passion for all things botanical.
          </p>
          <p className='landContent'>
            Whether you're a seasoned gardener or just starting out, Nature Nook provides the perfect platform to connect with fellow enthusiasts, exchange plant care tips, and showcase your green thumb.
          </p>
          <p className='landContent'>
            Join our community today and explore a world of endless botanical wonders. Let's grow together!
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm /> {/* Render the RegisterForm component */}
          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}


export default LandingPage;
