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
        
	<h2>Inregistreaza un nou utilizator:</h2>

          <label>
            Adresa de mail:
            <input type="text" name="email" onChange={e => setEmail(e.target.value)} />
          </label>
          <label>
            Parola:
            <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
          </label>
          <label>
            Confirma Parola:
            <input type="password" name="confirmPassword" onChange={e => setconfirmPassword(e.target.value)}/>
          </label>
          <label>
            Rol:
            <input type="text" name="email" onChange={e => setRole(e.target.value)}/>
          </label>
          <label>
            Nume intreg:
            <input type="text" name="fullName" onChange={e => setFullName(e.target.value)}/>

          <input type="submit" value="Submit" />
          </label>

      </form>
    </div>
  );
}
