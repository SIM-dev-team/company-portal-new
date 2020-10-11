import React,{useState , useEffect} from 'react';
import { useHistory , Link } from "react-router-dom";
import auth from '../Auth';
import { Form , Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import default_logo from '../assets/images/profile_pic_default.png';
import { BeatLoader } from 'react-spinners';

function ViewApplicants({match}){
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
        .get(`http://localhost:5000/advert/getAdvertsByCompany`)
        .then(res => {
            console.log("data" + res.data)
            setIsAdvertLoaded(true);
        })
        .catch(err =>{ console.error(err);setIsAdvertLoaded(true);});
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

    
    return(
        <div className="profile-content">
            
        </div>
    );
}

export default ViewApplicants;