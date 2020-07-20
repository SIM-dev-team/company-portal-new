import React,{useState , useEffect} from 'react';
import { useHistory , Link } from "react-router-dom";
import auth from '../Auth';
import axios from 'axios';
import default_logo from '../assets/images/profile_pic_default.png';
import Advert from '../components/advert';
import { BeatLoader } from 'react-spinners';


function Profile(){
    const history = useHistory();
    const [notifications , setNotifications] = useState(false);
    const [ads , setAds] = useState(true);
    const [isProfileDataLaoded , setIsProfileDataLoaded] = useState(false)
    const [isAdvertLoaded , setIsAdvertLoaded] = useState(false)

    const [company , setCompany] = useState({
        name: '',
        profile_pic: '',
        description: '',
        is_approved: false,
        comp_website: '',
        contact_number: '',
        email: '',
    });

    const [adverts , setAdverts ] = useState([]);

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
              email: res.data.email
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
                <div  className="loader">
                <BeatLoader color="gray"loading={!isProfileDataLaoded}/>
                </div>
                <div className="col-md-3 company-details card" hidden={!isProfileDataLaoded}>
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
                <div className="vl"></div>
                <div>
                    <div className="feed">
                        <div>
                            <button className={ads ? 'active btn btn-primary' : 'btn btn-primary'} onClick={adsBtn}>Advertiesments</button>
                            <button className={notifications ? 'active btn btn-primary' : 'btn btn-primary'} onClick={notificationsBtn}>Notifications</button>
                        </div>
                        <button className="btn btn-secondary" onClick={logout}>Logout</button>
                    </div>
                    <div className="profile-bottom-content">
                        {notifications ? <div  className="none-text">No Notifications yet</div> : ''} 
                        
                        <div hidden={!ads} className="profile-bottom-content-text">
                        <Link to="/newAdvert" props={company.comp_id}><button className="create-new-add">+ Create new ad</button></Link>
                        <div className="feed-loader"><BeatLoader color="gray" loading={!isAdvertLoaded}/></div>
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
        </div>
    );
}

export default Profile;