import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initialValues = {password: '',re_password: ''}

const onSubmit = values => {
};

const validate = values => {
    let errors = {};
    if(!values.password){
        errors.password = 'password is required'
    }else if(values.password.toString().length < 8){
        errors.password = 'password must be longer than 8 characters'
    }
    if(!values.re_password){
        errors.re_password = 'please retype your password'
    }else if( !(values.password.toString() === values.re_password.toString())){
        errors.re_password = 'passwords does not match'
    }
    return errors;
}

function ResetPassword(props){
    const history = useHistory();
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });
     const submitData = (e) =>{
    e.preventDefault();
    const data = {id : props.match.params.key , password: formik.values.re_password }
    axios
    .post('http://localhost:5000/auth/resetPassword', data)
    .then(res => {
        if(res.data === 'error'){
            toast.error('Invalid password reset link', {position: toast.POSITION.TOP_RIGHT});
        }else if(res.data ==='invalid'){
            toast.error('Invalid password reset link', {position: toast.POSITION.TOP_RIGHT});
        }else if(res.data === 'password changed successfully'){
            toast.success('password changed successfully', {position: toast.POSITION.TOP_RIGHT});
            history.push('/login');
        }else{
            toast.error('something went wrong!!! please try again later', {position: toast.POSITION.TOP_RIGHT});
        }
        } )
    .catch(err => {
        console.error(err)
        toast.error('Error logging in', {position: toast.POSITION.TOP_RIGHT});
    });
}
    return(
        <div className="register-background">
        <div className="login-content">
            <div className="login-title">Password Reset</div>
            <Form onSubmit={submitData}>
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
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Retype Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="re_password" 
                        placeholder="Retype Password" 
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.re_password}
                    />
                    {(formik.errors.re_password && formik.touched.re_password) ? <small className="error">{formik.errors.re_password}</small> : ''}
                </Form.Group>
                <Button variant="primary" type="submit" disabled={formik.errors.re_password || formik.errors.password}>
                    Confirm
                </Button>
            </Form>
        </div>
        </div>
    );
}

export default ResetPassword;