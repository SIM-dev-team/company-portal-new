import React,{useState , useEffect} from 'react';
import logo from '../assets/images/logo.jpg';
import { useHistory } from "react-router-dom";
import auth from '../Auth';
import axios from 'axios';
import default_logo from '../assets/images/profile_pic_default.png';


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
        contact_number: '',
        email: '',
    });

    useEffect(()=>{
        axios
      .get(`http://localhost:5000/company/get/${localStorage.getItem('token')}`)
      .then(res => {
          console.log(res)
          const currentCompany = {
              name: res.data.comp_name,
              profile_pic: (res.data.profile_pic_url === null ? default_logo : res.data.profile_pic_url ),
              description: res.data.description,
              is_approved:res.data.is_approved,
              comp_website: res.data.comp_website,
              contact_number: res.data.contact_number,
              email: res.data.email
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

    const profile_pic = () =>{
        console.log('clicked')
    }
    return(
        <div className="profile-content">
            <div className="row">
                <div className="col-md-3 company-details card">
                    <div className="profile-edit-details-container">
                        <button className="profile-edit-details">edit</button>
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
                <div>
                    <div className="feed">
                        <div>
                            <button className={notifications ? 'active btn btn-primary' : 'btn btn-primary'} onClick={notificationsBtn}>Notifications</button>
                            <button className={ads ? 'active btn btn-primary' : 'btn btn-primary'} onClick={adsBtn}>Advertiesments</button>
                        </div>
                        <button className="btn btn-secondary" onClick={logout}>Logout</button>
                    </div>
                    <div className="profile-bottom-content">
                        <div hidden={!notifications} className="none-text">No Notifications yet</div>
                        <div hidden={!ads} className="profile-bottom-content-text">
                            <button className="create-new-add">+ Create new ad</button>
                            <div hidden={!ads} className="none-text">No Advertiesments to show</div> 
                        </div> 
                    </div>
                </div>
            </div>
            {/* <div className="row">
                <div className="profile-logo">
                    <img src={company.profile_pic} alt="company-logo" className="logo-image" onClick={profile_pic}/>
                </div>
                <div className="profile-description">
                    <div className="row top-description">
                    <div className="profile-comp-name">{company.name}</div>
                    <div className={company.is_approved ? 'approved' : 'not-approved'}>{company.is_approved ? 'approved by pdc': 'not approved by pdc yet'}</div>
                    </div>
                
                    <div>
                        {company.description}
                    </div>
                    <div><a href={'//'+company.comp_website} rel="noopener noreferrer" target="_blank">{company.comp_website}</a></div>
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
            </div> */}
        </div>
    );
}

export default Profile;