import React,{useState , useEffect} from 'react';
import logo from '../assets/images/logo.jpg';
import { useHistory } from "react-router-dom";
import auth from '../Auth';
import axios from 'axios';


function Profile(){
    const history = useHistory();
    const [notifications , setNotifications] = useState(true);
    const [ads , setAds] = useState(false);

    const [company , setCompany] = useState({
        name: '',
        profile_pic: '',
        description: '',
        is_approved: false,
        comp_website: '',
    });

    useEffect(()=>{
        axios
      .get(`http://localhost:5000/company/get/${localStorage.getItem('token')}`)
      .then(res => {
          const currentCompany = {
              name: res.data.comp_name,
              profile_pic: res.data.profile_pic_url,
              description: res.data.description,
              is_approved:res.data.is_approved,
              comp_website: res.data.comp_website,
          }
          setCompany(currentCompany);
          console.log(res);
      })
      .catch(err => console.error(err));
    }, [])
    
    const logout = ()=>{
        auth.logout();
        localStorage.removeItem('token');
        history.push('/');
    }

    const notificationsBtn = () =>{
        setNotifications(true);
        setAds(false);
    }

    const adsBtn = () =>{
        setAds(true);
        setNotifications(false);
    }
    return(
        <div className="profile-content">
            <div className="row">
                <div className="profile-logo">
                    <img src={logo} alt="company-logo" className="logo-image"/>
                </div>
                <div className="profile-description">
                    <div className="row top-description">
                    <div className="profile-comp-name">{company.name}</div>
                    <div className={company.is_approved ? 'approved' : 'not-approved'}>{company.is_approved ? 'approved by pdc': 'not approved by pdc yet'}</div>
                    </div>
                
                    <div>
                        {company.description}
                    </div>
                    <div><a href={company.comp_website}>{company.comp_website}</a></div>
                    <div className="row profile-btn">
                <div>
                <button className={notifications ? 'active btn btn-primary' : 'btn btn-primary'} onClick={notificationsBtn}>Notifications</button>
                <button className={ads ? 'active btn btn-primary' : 'btn btn-primary'} onClick={adsBtn}>Advertiesments</button>
                </div>
                <button className="btn btn-secondary" onClick={logout}>Logout</button>
            </div>
                </div>
            </div>
            
            <div className="profile-bottom-content">
              <div hidden={!notifications} className="profile-bottom-content-text">No Notifications yet</div>  
              <div hidden={!ads} className="profile-bottom-content-text">PDC is not Requesting Advertiesments yet</div> 
            </div>
        </div>
    );
}

export default Profile;