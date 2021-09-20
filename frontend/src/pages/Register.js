import React, {useState} from 'react';

import classes from './Register.module.css';

import useAuth from '../hooks/useAuth';

export default function Register() {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setconfirmPassword] = useState(null);
  const [role, setRole] = useState(null);
  const [fullName, setFullName] = useState(null);
  
  const {registerUser} = useAuth();

  const onSubmit = async event => {
    event.preventDefault();
    await registerUser({
      email,
      password,
      confirmPassword,
      role,
      fullName
    });
  };

  return (
    <div style = {{height:"100vh"}}>
      <form className={classes.form} onSubmit={onSubmit}>
        
	<h2>Register a new user:</h2>

          <label>
            Email address:
            <input type="text" name="email" onChange={e => setEmail(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
          </label>
          <label>
            Confirm Password:
            <input type="password" name="confirmPassword" onChange={e => setconfirmPassword(e.target.value)}/>
          </label>
          <label>
            Role:
            <input type="text" name="email" onChange={e => setRole(e.target.value)}/>
          </label>
          <label>
            Full Name:
            <input type="text" name="fullName" onChange={e => setFullName(e.target.value)}/>

          <input type="submit" value="Submit" />
          </label>

      </form>
    </div>
  );
}
