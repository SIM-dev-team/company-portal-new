import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import Welcome from './views/welcome';
import Login from './views/login';
import Register from './views/register';
import EmailVerify from './views/emailVerify';
import Profile from './views/profile';
import About from './views/about';
import Contact from './views/contact';
import ForgotPassword from './views/forgotPassword';
import ResetPassword from './views/resetPassword';

import { ProtectedRoute } from './ProtectedRoute';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';



toast.configure()
function App() {
  return (
    <div>
      <Router>
      <Navbar />
      <Switch>
          <Route exact path = '/login' component= {Login}/>
          <Route exact path = '/register' component= {Register}/>
          <Route exact path = '/' component= {Welcome}/>
          <ProtectedRoute exact path = '/profile' component= {Profile}/>
          <Route exact path = '/verify-email' component= {EmailVerify}/>
          <Route exact path = '/about' component= {About}/>
          <Route exact path = '/contact' component= {Contact}/>
          <Route exact path = '/forgot-password' component= {ForgotPassword}/>
          <Route exact path = '/reset-password/:key' component= {ResetPassword}/>
      </Switch>
      </Router>
    
    </div>
  );
}

export default App;
