import {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';

import {UserContext} from './UserContext';

export default function useAuth() {
  let history = useHistory();
  const {setUser} = useContext(UserContext);
  const [error, setError] = useState(null);

  const setUserContext = async() => {

    return await fetch('/api/user', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
	.then(response => response.json())
	.then(data => {
	  setUser(data.currentUser);
          history.push('/');
	})
	.catch(err => {
	  console.log(err);
	});
  };
   const registerUser = async(data) => {
    const {email, password, confirmPassword, role, fullName} = data;
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
        role,
        fullName
      }),
    })
      .then(response => response.json())
       .then(async data => {
         if (data.status === 'error') {
           for (let value of JSON.parse(data.message)) {
             alert(value);
           }
         } else if (data.status === 'ok') {
             alert(data.message);
             await setUserContext();
         }
      })
      .catch(err => {
        return setError(err);
      });
  };

  const loginUser = async(data) => {
    const {email, password} = data;

    fetch('/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email,
        password,
      })
    })
      .then(response => response.json())
      .then(async data => {
        if (data.status === 'ok') {
          alert(data.message);
          await setUserContext();
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
        return setError(err);
      });
  };

  const logoutUser = async() => {
    await fetch('/api/auth/logout', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        setUser(null);
      })
      .catch(err => console.log(err));
  };

  const resetPassword = async(data) => {
    const {email, currentPassword, newPassword, confirmNewPassword} = data;

    fetch('/api/auth/reset_password', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email,
        currentPassword,
        newPassword,
        confirmNewPassword
      })
    })
      .then(response => response.json())
      .then(async (data) => {
        if (data.status === 'ok') {
          alert(data.message);
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
        return setError(err);
      });
  };

  return {
    registerUser,
    loginUser,
    logoutUser,
    resetPassword,
    error
  };

}
