import React, {useState} from 'react';

// Hooks
import useAuth from '../hooks/useAuth';

// CSS
import classes from './Login.module.css';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {loginUser} = useAuth();

  const onSubmit = async event => {
    event.preventDefault();

    await loginUser({
      email,
      password
    });
  };

  return (
    <div style = {{height:"100vh"}}>
      <form className={classes.form}
            onSubmit={onSubmit}>
	<h2>Logheaza-te aici:</h2>
          <label>
            Adresa de mail:
            <input type="text" name="email" onChange={e => setEmail(e.target.value)}/>
          </label>
          <label>
            Parola:
            <input type="password" name="password" onChange={e => setPassword(e.target.value)}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
    </div>
  );
  
}

export default Login;
