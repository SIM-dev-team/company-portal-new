import React , {useState} from 'react';
import { Form, Button ,Col} from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValues = {
        email : '',
        password : '',
        re_password: '',
        comp_name : '',
        reg_no : '',
        date_of_establishment: '',
        description : '',
        comp_website : '',
        address : '',
        contact_number : '',
        fax_number : '',
        num_of_employees : '',
        num_of_techleads : '',
        // provide_internships : ''
}


const validate = (values) =>{
    const errors = {};
    if(!values.comp_name){
        errors.comp_name = 'Company name is required'
    }else if(values.comp_name.trim().length === 0){
        errors.comp_name = 'Company name is required'
    }
    if(!values.description){
        errors.description = 'Company description is required'
    }else if(values.description.trim().length === 0){
        errors.description = 'Company description is required'
    }
    if(!values.comp_website){
        errors.comp_website = 'Company website url is required'
    // eslint-disable-next-line no-useless-escape
    }else if(!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(values.comp_website)){
        errors.comp_website = 'invalid url format'
    }
    if(!values.date_of_establishment){
        errors.date_of_establishment = 'Date of establishment is required'
    }else if(Date.parse(values.date_of_establishment) > Date.now()){
        errors.date_of_establishment = 'Valid Date is required'
    }
    if(!values.reg_no){
        errors.reg_no = 'Company registration number is required'
    }
    if(!values.num_of_employees){
        errors.num_of_employees = 'Number of employees is required'
    }else if(values.num_of_employees < 1) {
        errors.num_of_employees = 'Number of employees is invalid'
    }
    if(!values.num_of_techleads){
        errors.num_of_techleads = 'Number of techleads is required'
    }else if(values.num_of_techleads < 1) {
        errors.num_of_techleads = 'Number of techleads is invalid'
    }
    if(!values.address){
        errors.address = 'Current company address is required'
    }
    if(!values.contact_number){
        errors.contact_number = 'Company contact number is required'
    }else if(values.contact_number.toString().length < 9){
        errors.contact_number = 'contact number is invalid'
    }
    if(!values.fax_number){
        errors.fax_number = 'Company fax number is required'
    }
    if(!values.email){
        errors.email = 'email is required'
    // eslint-disable-next-line no-useless-escape
    }else if(!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(values.email)){
        errors.email = 'invalid email format'
    }
    if(!values.password){
        errors.password = 'Password is required'
    }else if(values.password.toString().length < 8){
        errors.password = 'password must be longer than 8 characters'
    }
    if(!values.re_password){
        errors.re_password = 'Please re enter your password'
    }
    else if( !(values.password.toString() === values.re_password.toString())){
        errors.re_password = 'passwords does not match'
    }

    return errors;
}

const onSubmit = (values) =>{}


function Register({props}){
    const [isFirstDone , setFirst] = useState(false);
    const [isSecondDone , setSecond] = useState(false);
    const history = useHistory();

    const formik = useFormik({initialValues,onSubmit,validate})

    const setFirstDone = () => {
        setFirst(true);
    }
    const setSecondDone = () => {
        setSecond(true);
    }

    const submitData = (e) =>{
        e.preventDefault();
        console.log(formik.values);
        axios
        .post('http://localhost:5000/auth/register', formik.values)
        .then(res => {
            console.log(res.data)
            if(res.data === 'email already exist'){
                toast.warning('email already exist', {position: toast.POSITION.TOP_RIGHT});
            }else{
                toast.success('successfully registered', {position: toast.POSITION.TOP_RIGHT});
                history.push('/verify-email');
            }
            } )
        .catch(err => {
            if(err.data === 'error connecting to the database'){
                toast.error('error connecting to the database', {position: toast.POSITION.TOP_RIGHT});
            }else{
                toast.error('registration failed', {position: toast.POSITION.TOP_RIGHT});
            }
            history.push('/register');
        });
    }

    return(
        <div className="register-background">
        <div className="register-content">
            <div className="register-title">Register</div>
            <Form onSubmit={submitData}>
                <div className={isFirstDone ? "hidden" : ""}>
                    <div className="register-form-section-title">Basic Company Details</div>
                    <Form.Group as={Col}>

                    <Form.Label>Company Name</Form.Label>
                        <Form.Control name="comp_name" type="text" value={formik.values.comp_name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {(formik.errors.comp_name && formik.touched.comp_name) ? <small className="error">{formik.errors.comp_name}</small> : ''}
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Company Description</Form.Label>
                        <Form.Control name="description" type="text" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {(formik.errors.description && formik.touched.description) ? <small className="error">{formik.errors.description}</small> : ''}
                    </Form.Group>

                    <Form.Group  as={Col}>
                        <Form.Label>Website Url</Form.Label>
                        <Form.Control name="comp_website" type="text" value={formik.values.comp_website} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {(formik.errors.comp_website && formik.touched.comp_website) ? <small className="error">{formik.errors.comp_website}</small> : ''}
                    </Form.Group>

                    <Form.Row className="form-row">
                        <Form.Group as={Col}>
                            <Form.Label>Date of establishment</Form.Label>
                            <Form.Control name="date_of_establishment" type="date" value={formik.values.date_of_establishment} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            {(formik.errors.date_of_establishment && formik.touched.date_of_establishment) ? <small className="error">{formik.errors.date_of_establishment}</small> : ''}
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Company Registration number</Form.Label>
                            <Form.Control name="reg_no" type="text" value={formik.values.reg_no} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            {(formik.errors.reg_no && formik.touched.reg_no) ? <small className="error">{formik.errors.reg_no}</small> : ''}
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>No of Employees</Form.Label>
                            <Form.Control name="num_of_employees" type="number" value={formik.values.num_of_employees} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            {(formik.errors.num_of_employees && formik.touched.num_of_employees) ? <small className="error">{formik.errors.num_of_employees}</small> : ''}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>No of Techleads</Form.Label>
                            <Form.Control name="num_of_techleads" type="number" value={formik.values.num_of_techleads} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            {(formik.errors.num_of_techleads && formik.touched.num_of_techleads) ? <small className="error">{formik.errors.num_of_techleads}</small> : ''}
                        </Form.Group>
                    </Form.Row>

                    <Button onClick={setFirstDone} disabled={
                        formik.errors.comp_name || 
                        formik.errors.description ||
                        formik.errors.comp_website || 
                        formik.errors.date_of_establishment ||
                        formik.errors.reg_no || 
                        formik.errors.num_of_employees ||
                        formik.errors.num_of_techleads ||
                        !formik.touched.comp_name || 
                        !formik.touched.description ||
                        !formik.touched.comp_website || 
                        !formik.touched.date_of_establishment ||
                        !formik.touched.reg_no || 
                        !formik.touched.num_of_employees ||
                        !formik.touched.num_of_techleads 
                        }>
                        Next
                    </Button>

                </div>
                <div className={!isFirstDone || isSecondDone ? "hidden" : ""}>
                    <div className="register-form-section-title">Company Contact Details</div>
                    <Form.Group as={Col}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control name="address" type="test" value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            {(formik.errors.address && formik.touched.address) ? <small className="error">{formik.errors.address}</small> : ''}
                    </Form.Group>
                    <Form.Row className="form-row">
                    <Form.Group as={Col}>
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control name="contact_number" type="text" value={formik.values.contact_number} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            {(formik.errors.contact_number && formik.touched.contact_number) ? <small className="error">{formik.errors.contact_number}</small> : ''}
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Fax Number</Form.Label>
                        <Form.Control name="fax_number" type="text" value={formik.values.fax_number} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            {(formik.errors.fax_number && formik.touched.fax_number) ? <small className="error">{formik.errors.fax_number}</small> : ''}
                    </Form.Group>
                    </Form.Row>


                    <Button variant="primary" type="button" onClick={setSecondDone} 
                        disabled={
                            formik.errors.address || 
                            formik.errors.contact_number ||
                            formik.errors.fax_number || 
                            !formik.touched.address || 
                            !formik.touched.contact_number ||
                            !formik.touched.fax_number
                            }>
                        Next
                    </Button>
                </div>
                <div className={!isSecondDone ? "hidden" : ""}>
                   <div className="register-form-section-title">Company Account Details</div>
                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="string" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            {(formik.errors.email && formik.touched.email) ? <small className="error">{formik.errors.email}</small> : ''}
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            {(formik.errors.password && formik.touched.password) ? <small className="error">{formik.errors.password}</small> : ''}
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Retype Password</Form.Label>
                        <Form.Control name="re_password" type="password" value={formik.values.re_password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            {(formik.errors.re_password && formik.touched.re_password) ? <small className="error">{formik.errors.re_password}</small> : ''}
                    </Form.Group>
                    <Button variant="primary" type="submit" 
                    disabled={
                        formik.errors.email || 
                        formik.errors.password ||
                        formik.errors.re_password || 
                        !formik.touched.email || 
                        !formik.touched.password ||
                        !formik.touched.re_password
                        } 
                        >
                        Confirm
                    </Button>
                </div>
            </Form>
        </div>
        </div>
    );
                    }
export default Register;