import React,{useState} from 'react';
import { Form, Button , Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import { storage } from '../firebase';

var randomstring = require("randomstring");

function NewAdvert(props) {
    const token = localStorage.getItem('token');
    const [advertImage , setAdvertImage] = useState(null);
    const [isUploading , setIsUploading ] = useState(false)
    const history = useHistory();
    const initialValues = {
                        token:token ,
                        date_created : new Date().getUTCDate() ,
                        internship_position : '' ,
                        position_desc : '' ,
                        job_desc : '' ,
                        knowledge_skills : '' ,
                        benefits : '',
                        no_of_positions : '' ,
                        no_of_applicants : '',
                        attachment_url : ''
    };
    const validate = values => {
        let errors = {};
        if(values.internship_position === 'Select intenship position'){
            errors.internship_position = 'internship position is required'
        }
        if(!values.no_of_positions){
            errors.no_of_positions = 'a valid number of positions required'
        }
        else if(values.no_of_positions < 1){
            errors.no_of_positions = 'a valid number of positions required'
        }
        if(!values.position_desc){
            errors.position_desc = 'short description about the position is required'
        }
        return errors;
    }
    const onSubmit = (e) =>{
        setIsUploading(true);
        e.preventDefault();
        const r = randomstring.generate();
        console.log(r);
        const UploadImage = storage.ref(`AdvertiesmentImages/${r}`).put(advertImage);
        UploadImage.on('state_changed' ,
            snapshot => {},
            error => {
                console.log(error)
            },
            ()=>storage
            .ref('AdvertiesmentImages')
            .child(r)
            .getDownloadURL()
            .then(url =>{
                const advertData = {
                    profile_pic: url,
                    date_created:formik.values.date_created,
                    internship_position: formik.values.internship_position,
                    position_desc: formik.values.position_desc,
                    job_desc: formik.values.job_desc,
                    knowledge_skills : formik.values.knowledge_skills,
                    benefits:formik.values.benefits,
                    no_of_positions: formik.values.no_of_positions,
                    no_of_applicants: formik.values.no_of_applicants,
                    attachment_url: url,
                    token:token ,
                }
                axios
                .post("http://localhost:5000/advert/create" , advertData)
                .then(res => {
                    console.log(res.data.status)
                        toast.success('successfully created', {position: toast.POSITION.TOP_RIGHT});
                        setIsUploading(false);
                        history.push('/profile');
                        console.log(res.data);
                })
                .catch(err => {
                    console.error(err);
                    toast.error('something went wrong', {position: toast.POSITION.TOP_RIGHT});
                        setIsUploading(false);
                        history.push('/profile');
                    });
                })
            )
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });
    const handleImageChange = (e) => {
        if(e.target.files[0]){
            setAdvertImage(e.target.files[0]);
        }
    }
    return (
        <div className="create-new-ad">
            <div className="row">
            <div className="create-ad-form">
            <Form onSubmit={onSubmit}>
                <div className="create-new-advert-title">Create new Advert</div>
                        <Form.Row className="form-row">
                            <Form.Group controlId="exampleForm.ControlSelect1" as={Col}>
                                <Form.Label>select position type</Form.Label>
                                <Form.Control
                                    as="select"
                                    type="text" 
                                    name="internship_position"
                                    placeholder="Select Position"
                                    value={formik.values.internship_position}
                                    onChange = {formik.handleChange}
                                    onBlur = {formik.handleBlur}
                                >
                                <option defaultChecked disabled>Select intenship position</option>
                                <option>Software Engineering</option>
                                <option>Quality Assuarance</option>
                                <option>Business Analyst</option>
                                <option>Progect Management</option>
                                <option>Web Development</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Number of position</Form.Label>
                                <Form.Control 
                                name="no_of_positions" 
                                type="number" 
                                value={formik.values.no_of_positions} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}/>
                                {(formik.errors.no_of_positions && formik.touched.no_of_positions) ? <small className="error">{formik.errors.no_of_positions}</small> : ''}
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                        <Form.Group controlId="exampleForm.ControlTextarea1" as={Col}>
                            <Form.Label>Short Description about Position</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows="3" 
                                name="position_desc" 
                                type="number" 
                                value={formik.values.position_desc} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}/>
                                {(formik.errors.position_desc && formik.touched.position_desc) ? <small className="error">{formik.errors.position_desc}</small> : ''}
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1" as={Col}>
                            <Form.Label>Description about the works to be carried out</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows="3" 
                                name="job_desc" 
                                type="number" 
                                value={formik.values.job_desc} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}/>
                        </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="exampleForm.ControlTextarea1" as={Col}>
                            <Form.Label>Required Skills</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows="3" 
                                name="knowledge_skills" 
                                type="number" 
                                value={formik.values.knowledge_skills} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1" as={Col}>
                            <Form.Label>Potentiol Benefits</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows="3" 
                                name="benefits" 
                                type="number" 
                                value={formik.values.benefits} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.File id="exampleFormControlFile1" label="Select Attachment" onChange={handleImageChange}/>
                        </Form.Group>
                        </Form>
                </div>
                <div className="create-ad-preview">
                    <div className="ad-preview-title">Your Advertiesment</div>
                    <hr/>
                    <div className="ad-preview-lable">Internship Position : <span className="ad-preview-data">{formik.values.internship_position}</span></div>
                    <div className="ad-preview-lable">Number of positions : <span className="ad-preview-data">{formik.values.no_of_positions}</span></div>
                    <div className="ad-preview-lable">Position description :<span className="ad-preview-data">{formik.values.position_desc}</span></div>
                    <div className="ad-preview-lable">Work to be done : <span className="ad-preview-data">{formik.values.job_desc}</span></div>
                    <div className="ad-preview-lable">Required skills : <span className="ad-preview-data">{formik.values.knowledge_skills}</span></div>
                    <div className="ad-preview-lable">Benefits : <span className="ad-preview-data">{formik.values.benefits}</span></div>
                    <div className="ad-preview-lable">attachment : <span className="ad-preview-data">{advertImage ? advertImage.name : ''}</span></div>
                    <div className="row new-advert-buttons">
                    </div>
                </div>
                <div className="ad-new-button-block">
                <button className="btn btn-danger" onClick={()=>{history.push('/profile');}} disabled={isUploading}>Cancel</button>
                    <Button variant="primary" type="submit" 
                    onClick={onSubmit}
                    disabled={
                        formik.errors.position_desc || 
                        formik.errors.internship_position ||
                        formik.errors.no_of_positions ||
                        !formik.touched.position_desc || 
                        !formik.touched.internship_position ||
                        !formik.touched.no_of_positions ||
                        isUploading
                    }
                        >
                        Confirm
                    </Button>
                    <div>
                    <small className="updating-text" hidden={!isUploading}>Uploading...</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewAdvert;
