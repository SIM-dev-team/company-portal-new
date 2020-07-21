import React,{useState , useEffect} from 'react';
import { useHistory , Link } from "react-router-dom";
import auth from '../Auth';
import { Form, Button , Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import default_logo from '../assets/images/profile_pic_default.png';
import Advert from '../components/advert';
import { BeatLoader } from 'react-spinners';
import Model from 'react-modal';
import { storage } from '../firebase';

const modalStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      padding                : '20px'
    }
  };
  
  const editProfileModalStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      padding               : '20px',
      height                : '600px',
      width                 : '50%'

    }
  };
Model.setAppElement('#root');
function Profile(){
    const history = useHistory();
    const [notifications , setNotifications] = useState(false);
    const [ads , setAds] = useState(true);
    const [profileImage , setProfileImage] = useState(null);
    const [isProfileDataLaoded , setIsProfileDataLoaded] = useState(false);
    const [isAdvertLoaded , setIsAdvertLoaded] = useState(false);
    const [islogoutModelOpen , setIslogoutModelOpen] = useState(false);
    const [isEditProfileModelOpen , setIsEditProfileModelOpen] = useState(false);

    const [company , setCompany] = useState({
        name: '',
        profile_pic: '',
        description: '',
        is_approved: false,
        comp_website: '',
        contact_number: '',
        email: '',
        comp_id : ''
    });
    const [adverts , setAdverts ] = useState([]);
    const initialValues = {
        token:'' ,
        date_created : new Date().toLocaleDateString() ,
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
        if(!values.internship_position){
        errors.internship_position = 'internship position is required'
        }
        if(!values.no_of_positions){
        errors.no_of_positions = 'a valid number of positions required'
        }
        if(!values.position_desc){
        errors.position_desc = 'short description about the position is required'
        }
        return errors;
    }
    const onSubmit = (e) =>{}
        const formik = useFormik({
            initialValues,
            onSubmit,
            validate
        });

    useEffect(()=>{
        axios
      .get(`http://localhost:5000/company/get/${localStorage.getItem('token')}`)
      .then(res => {
          const currentCompany = {
              name: res.data.comp_name,
              profile_pic: (res.data.profile_pic_url === null ? default_logo : res.data.profile_pic_url ),
              description: res.data.description,
              is_approved:res.data.is_approved,
              comp_website: res.data.comp_website,
              contact_number: res.data.contact_number,
              email: res.data.email,
              comp_id: res.data.comp_id
          }
          setCompany(currentCompany);
          setIsProfileDataLoaded(true)
      })
      .catch(err => console.error(err));
    }, [])

    useEffect(()=>{
        const token = localStorage.getItem('token');
        axios
      .post(`http://localhost:5000/advert/getAdvertsByCompany`,{token})
      .then(res => {
          setAdverts(res.data);
          setIsAdvertLoaded(true);
      })
      .catch(err => console.error(err));
    }, [])
    
    const logout = ()=>{
        setIslogoutModelOpen(true);
        console.log(company)
    }

    const notificationsBtn = () =>{
        setNotifications(true);
        setAds(false);
    }

    const adsBtn = () =>{
        setAds(true);
        setNotifications(false);
    }

    const profile_pic = () =>{
        console.log('clicked')
    }
    const handleImageChange = (e) => {
        if(e.target.files[0]){
            setProfileImage(e.target.files[0]);
        }
    }

    const updateProfile = (e)=>{
        e.preventDefault();
        const UploadImage = storage.ref(`CompanyProfilePictures/${company.comp_id}`).put(profileImage);
        UploadImage.on('state_changed' ,
        snapshot => {},
        error => {
            console.log(error)
        },
        ()=>storage
        .ref('CompanyProfilePictures')
        .child(company.comp_id.toString())
        .getDownloadURL()
        .then(url =>{
            console.log(url)
        })

        )
    }
    return(
        <div className="profile-content">
            <div className="row">
                <div  className="loader" hidden={isProfileDataLaoded}>
                <BeatLoader color="gray"loading={!isProfileDataLaoded}/>
                </div>
                <div className="col-md-3 company-details card" hidden={!isProfileDataLaoded}>
                    <div className="profile-edit-details-container">
                        <button className="profile-edit-details" onClick={()=>setIsEditProfileModelOpen(true)}>edit</button>
                    </div>
                    <div className="profile-logo">
                        <img src={company.profile_pic} alt="company-logo" className="logo-image" onClick={profile_pic}/>
                    </div>
                    <div className="profile-comp-name">{company.name}</div>
                    <hr/>
                    <div className="company-description">{company.description}</div>
                    <div className="contact-details">Contact details</div>
                    <hr/>
                    <div className="contact-details-content">
                        <div><a href={'//'+company.comp_website} rel="noopener noreferrer" target="_blank">{company.comp_website}</a></div>
                        <div>{company.email}</div>
                        <div>{company.contact_number}</div>
                    </div>
                </div>
                {/* <div className="vl"></div> */}
                <div>
                    <div className="feed">
                        <div>
                            <button className={ads ? 'active btn btn-primary' : 'btn btn-primary'} onClick={adsBtn}>Advertiesments</button>
                            <button className={notifications ? 'active btn btn-primary' : 'btn btn-primary'} onClick={notificationsBtn}>Notifications</button>
                        </div>
                        <button className="btn btn-secondary" onClick={logout}>Logout</button>
                    </div>
                    <div className="profile-bottom-content">
                        <div hidden={!notifications} className="none-text">No Notifications yet</div>
                        
                        <div hidden={!ads} className="profile-bottom-content-text">
                        <Link to="/newAdvert" props={company.comp_id}><button className="create-new-add">+ Create new ad</button></Link>
                        <BeatLoader color="gray" loading={!isAdvertLoaded}/>
                            <div hidden={adverts.length !== 0 || !isAdvertLoaded} className="none-text">No Advertiesments to show</div> 
                            <div className="ad-list">
                                {
                                    adverts.map(advert => <Advert key={advert.ad_id} advert={advert}/>)
                                }
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
            <Model isOpen={islogoutModelOpen} style={modalStyles}>

                <div className="logout-modal-title">Logout</div>
                <div className="logout-modal-text">Do you want to logout ?</div>
                <div className="row logout-model-buttons">
                <button className="btn btn-primary" onClick={()=>setIslogoutModelOpen(false)}>Cancel</button>
                <button className="btn btn-danger" 
                        onClick={
                            ()=>{auth.logout();
                                localStorage.removeItem('token');
                                history.push('/');}
                            }
                            >Logout</button>
                </div>
                
            </Model>

            <Model isOpen={isEditProfileModelOpen} style={editProfileModalStyles}>
            <div className="edit-profile-title">Edit Profile</div>
                <Form>
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
                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="string" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            {(formik.errors.email && formik.touched.email) ? <small className="error">{formik.errors.email}</small> : ''}
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
                    <input type="file" onChange={handleImageChange}/>
                    <div className="row logout-model-buttons">
                        <button className="btn btn-primary"onClick={()=>setIsEditProfileModelOpen(false)}>Cancel</button>
                        <button className="btn btn-warning" onClick={updateProfile}>Update</button>
                    </div>
                </Form>
            </Model>
        </div>
    );
}

export default Profile;