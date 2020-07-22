import React,{useState , useEffect} from 'react';
import { useHistory , Link } from "react-router-dom";
import auth from '../Auth';
import { Form , Col } from 'react-bootstrap';
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
    const [isUpdating , setIsUpdating] = useState(false);

    const [company , setCompany] = useState({
        name: '',
        profile_pic: '',
        description: '',
        is_approved: false,
        comp_website: '',
        contact_number: '',
        email: '',
        comp_id : '',
        fax_number: ''
    });
    const [adverts , setAdverts ] = useState([]);

    const validate = values => {
        let errors = {};
        if(!values.description){
        errors.description = 'description is required'
        }
        if(!values.contact_number){
            errors.contact_number = 'Company contact number is required'
        }else if(values.contact_number.toString().length < 9){
            errors.contact_number = 'contact number is invalid'
        }
        if(!values.fax_number){
        errors.fax_number = 'fax number is required'
        }
        if(!values.comp_website){
            errors.comp_website = 'Company website url is required'
        // eslint-disable-next-line no-useless-escape
        }else if(!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(values.comp_website)){
            errors.comp_website = 'invalid url format'
        }
        return errors;
    }

    const onSubmit = (e) =>{}

    const formikTwo = useFormik({
        initialValues : company,
        enableReinitialize:true,
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
              comp_id: res.data.comp_id,
              fax_number : res.data.fax_number
          }
          setCompany(currentCompany);
          setIsProfileDataLoaded(true);
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
    }

    const notificationsBtn = () =>{
        setNotifications(true);
        setAds(false);
    }

    const adsBtn = () =>{
        setAds(true);
        setNotifications(false);
    }

    const handleImageChange = (e) => {
        if(e.target.files[0]){
            setProfileImage(e.target.files[0]);
        }
    }

    const updateProfile = (e)=>{
        setIsUpdating(true);
        e.preventDefault();
        try{
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
                const updatedData = {
                    profile_pic: url,
                    comp_id:company.comp_id,
                    description: formikTwo.values.description,
                    comp_website: formikTwo.values.comp_website,
                    contact_number: formikTwo.values.contact_number,
                    fax_number : formikTwo.values.fax_number
                }
                axios
                  .post(`http://localhost:5000/company/update`,{updatedData})
                  .then(res => {
                      console.log(res);
                      setIsUpdating(false);
                      window.location.reload();
                    })
                  .catch(err => console.error(err));
            })
            )
        }catch(e){
            const updatedData = {
                profile_pic: company.profile_pic,
                comp_id:company.comp_id,
                description: formikTwo.values.description,
                comp_website: formikTwo.values.comp_website,
                contact_number: formikTwo.values.contact_number,
                fax_number : formikTwo.values.fax_number
            }
            axios
                .post(`http://localhost:5000/company/update`,{updatedData})
                .then(res => {
                    console.log(res);
                    setIsUpdating(false);
                    window.location.reload();
                  })
                .catch(err => console.error(err));
        }

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
                        <img src={company.profile_pic} alt="company-logo" className="logo-image"/>
                    </div>
                    <div className="profile-comp-name">{company.name}</div>
                    <hr/>
                    <div className="company-description">{company.description}</div>
                    <div className="contact-details">Contact details</div>
                    <hr/>
                    <div className="contact-details-content">
                        <div><a className="comp_website" href={'//'+company.comp_website} rel="noopener noreferrer" target="_blank">{company.comp_website}</a></div>
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
                        <Form.Control 
                         name="description" 
                         type="text" 
                         value={formikTwo.values.description} 
                         onChange={formikTwo.handleChange} 
                         onBlur={formikTwo.handleBlur}/>
                        {(formikTwo.errors.description && formikTwo.touched.description) ? <small className="error">{formikTwo.errors.description}</small> : ''}
                    </Form.Group>

                    <Form.Group  as={Col}>
                        <Form.Label>Website Url</Form.Label>
                        <Form.Control 
                        name="comp_website" 
                        type="text" 
                        value={formikTwo.values.comp_website} 
                        onChange={formikTwo.handleChange} 
                        onBlur={formikTwo.handleBlur}/>
                        {(formikTwo.errors.comp_website && formikTwo.touched.comp_website) ? <small className="error">{formikTwo.errors.comp_website}</small> : ''}
                    </Form.Group>
                    <Form.Row className="form-row">
                    <Form.Group as={Col}>
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control 
                        name="contact_number" 
                        type="text" 
                        value={formikTwo.values.contact_number} 
                        onChange={formikTwo.handleChange} 
                        onBlur={formikTwo.handleBlur}/>
                            {(formikTwo.errors.contact_number && formikTwo.touched.contact_number) ? <small className="error">{formikTwo.errors.contact_number}</small> : ''}
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Fax Number</Form.Label>
                        <Form.Control 
                        name="fax_number" 
                        type="text" 
                        value={formikTwo.values.fax_number} 
                        onChange={formikTwo.handleChange} 
                        onBlur={formikTwo.handleBlur}/>
                            {(formikTwo.errors.fax_number && formikTwo.touched.fax_number) ? <small className="error">{formikTwo.errors.fax_number}</small> : ''}
                    </Form.Group>
                    </Form.Row>
                    <Form.Group as={Col}>
                    <Form.Label>Select a Profile Picture</Form.Label>
                    <br/>
                        <input type="file" onChange={handleImageChange}/>
                    </Form.Group>
                    
                    <div className="row editProfile-model-buttons ">
                        <button className="btn btn-primary"onClick={()=>setIsEditProfileModelOpen(false)} disabled={isUpdating}>Cancel</button>
                        <button 
                            className="btn btn-warning" 
                            onClick={updateProfile}
                            disabled={
                                formikTwo.errors.description ||
                                formikTwo.errors.comp_website ||
                                formikTwo.errors.contact_number ||
                                formikTwo.errors.fax_number ||
                                isUpdating
                            }
                            >Update</button>
                            
                    </div>
                    
                </Form>
                <small className="updating-text" hidden={!isUpdating}>Updating ...</small>
            </Model>
        </div>
    );
}

export default Profile;