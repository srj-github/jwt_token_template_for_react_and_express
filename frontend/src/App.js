import {Route, Switch, BrowserRouter} from 'react-router-dom';

import Layout from './components/layout/Layout';

// Pages
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import MainPage from './pages/MainPage';
import PrivateRoute from './pages/PrivateRoute';
import ResetPassword from './pages/ResetPassword';

// Hooks
import useFindUser from './hooks/useFindUser';
import {UserContext} from './hooks/UserContext';

function App() {

  const {user, setUser, isLoading} = useFindUser();

  return (
    <BrowserRouter>
      <UserContext.Provider value={{user, setUser, isLoading}}>
      <Layout>
	<Switch>
	  <Route path='/' exact={true} component={MainPage}/>
	  <Route path='/login' component={LoginPage}/>
	  <Route path='/register' component={RegisterPage}/>
	  <PrivateRoute path='/reset' component={ResetPassword}/>
	</Switch>
      </Layout>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
