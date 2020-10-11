import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { useHistory , Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../Auth';
const initialValues = {email: '',password: ''}

const onSubmit = values => {
};

const validate = values => {
    let errors = {};
    if(!values.email){
        errors.email = 'email is required'
    // eslint-disable-next-line no-useless-escape
    }else if(!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(values.email)){
        errors.email = 'invalid email format'
    }

    if(!values.password){
        errors.password = 'password is required'
    }

    return errors;
}

function Login(){
    const history = useHistory();
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });
    const submitData = (e) =>{
        e.preventDefault();
        
        axios
        .post('http://localhost:5000/auth/login', formik.values)
        .then(res => {
            if(res.data === 'no user data found'){
                toast.error('Invalid user data', {position: toast.POSITION.TOP_RIGHT});
            }else if( res.data ==='Account not verified'){
                toast.warning('Your e mail is not verified yet please check your email for the verification link', {position: toast.POSITION.TOP_RIGHT});
            }else if(res.data ==='Incorrect password'){
                toast.error('Incorrect password', {position: toast.POSITION.TOP_RIGHT});
            }else{
                localStorage.setItem('token' , res.data)
                // toast.success('Logged in successfully', {position: toast.POSITION.TOP_RIGHT});
                auth.login();
                history.push('/profile');
            }
            } )
        .catch(err => {
            console.error(err)
            toast.error('Error logging in', {position: toast.POSITION.TOP_RIGHT});
            // history.push('/');
        });
    }
    return(
        <div className="register-background">
        <div className="login-content">
            <div className="login-title">Login</div>
            <Form onSubmit={submitData}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        name="email" 
                        placeholder="Enter email"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.email}
                    />
                    {(formik.errors.email && formik.touched.email) ? <small className="error">{formik.errors.email}</small> : ''}
                </Form.Group>
                

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.password}
                    />
                    {(formik.errors.password && formik.touched.password) ? <small className="error">{formik.errors.password}</small> : ''}
                </Form.Group>
                <Link to="/forgot-password" className="forgot-password">forgot password</Link>
                <Button variant="primary" type="submit"
                 disabled={
                     formik.errors.email || 
                     formik.errors.password ||
                     !formik.touched.email ||
                     !formik.touched.password
                     }>
                    Login
                </Button>
            </Form>
        </div>
        </div>
    );
}

export default Login;