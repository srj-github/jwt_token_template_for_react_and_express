import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';

import {UserContext} from './../hooks/UserContext';

export default function PrivateRoute(props) {
  const {user} = useContext(UserContext);
  const {component: Component, values, ...rest} = props;

  if(user) {
    return (
      <Route {...rest} render={(props) => (<Component {...props} {...values}/>)}/>
    );
  } else {
    console.log('Nu esti logat!');
    return <Redirect to={{
      pathname: '/login',
      state:{message: 'Trebuie intai sa te logezi!'}
    }}/>;
  }

}
