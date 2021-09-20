// React
import React from 'react';
import  { Link } from 'react-router-dom';

// Hooks
import UseAuth from '../hooks/useAuth';

// CSS
import classes from './MainPage.module.css';

function MainPage() {

  const {logoutUser} = UseAuth();

  return (
    <div className={classes.container}>
      <h1> Jwt Template</h1>

      <ul>
        <li><Link to='/register'>Register Page</Link></li>
        <li><Link to='/login'>Login Page</Link></li>
        <li><Link to='/reset'>Reset Page</Link></li>
        <li><Link
              to={{pathname: '/login',
                   state: {message: 'You successfully logged in!'}
                  }}
              onClick={() => {logoutUser();}}
            >
              Logout
            </Link></li>
      </ul>
    </div>
  );
}

export default MainPage;
