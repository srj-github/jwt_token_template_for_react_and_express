// React
import {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';

// Hooks
import useAuth from '../hooks/useAuth';
import {UserContext} from '../hooks/UserContext';

// CSS
import classes from './ResetPassword.module.css';

function ResetPassword() {

  const context = useContext(UserContext);
  const email = context.user.email;

  const history = useHistory();

  const {resetPassword} = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const onSubmit = async event => {
    event.preventDefault();

    await resetPassword({
      email,
      currentPassword,
      newPassword,
      confirmNewPassword
    });
  };

  return (
    <div style = {{height:"100vh"}}>
      <form className={classes.form} onSubmit={onSubmit}>
    	<h2>Reseteaza-ti Parola</h2>
          <label>
            Parola curenta:
            <input type="password" name="email" onChange={e => setCurrentPassword(e.target.value)}/>
          </label>
          <label>
            Noua Parola:
            <input type="password" name="email" onChange={e => setNewPassword(e.target.value)}/>
          </label>
          <label>
            Confirma Noua Parola
            <input type="password" name="email" onChange={e => setConfirmNewPassword(e.target.value)}/>
          </label>
          <input type="submit" value="Submit" />

      </form>
    </div>

  );
}

export default ResetPassword;
