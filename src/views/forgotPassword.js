import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initialValues = {email: ''}

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

    return errors;
}

function ForgotPassword(){
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });
     const submitData = (e) =>{
    e.preventDefault();
    
    axios
    .post('http://localhost:5000/auth/forgotpassword', formik.values)
    .then(res => {
        if(res.data === 'no user data found'){
            toast.error('Invalid user data', {position: toast.POSITION.TOP_RIGHT});
        }else if( res.data ==='Account not verified'){
            toast.warning('Your e mail is not verified yet', {position: toast.POSITION.TOP_RIGHT});
        }else if( res.data ==='sent mail' ){
            toast.success('Password reset link has been sent to your e mail', {position: toast.POSITION.TOP_RIGHT});
        }else{
            toast.erro('Something went wrong , please try again later', {position: toast.POSITION.TOP_RIGHT});
        }
        } )
    .catch(err => {
        console.error(err)
        toast.error('no user data found', {position: toast.POSITION.TOP_RIGHT});
        // history.push('/');
    });
}
    return(
        <div className="register-background">
        <div className="login-content">
            <div className="login-title">Forgot Password</div>
            
            <Form onSubmit={submitData}>
            <div>Please enter your account email address</div>
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
                <Link to="/login" className="forgot-password">Back to login</Link>
                <Button variant="primary" type="submit" disabled={formik.errors.email || !formik.touched.email}>
                    Confirm
                </Button>
            </Form>
        </div>
        </div>
    );
}

export default ForgotPassword;