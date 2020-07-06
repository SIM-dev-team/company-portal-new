import React,{useState} from 'react';
import logo from '../assets/images/logo.jpg';
import { useHistory } from "react-router-dom";
import auth from '../Auth';
import axios from 'axios';


function Profile(){
    const history = useHistory();
    const [company , setCompany] = useState({
        name: '',
        profile_pic: '',
        description: '',
        is_approved: false,
        comp_website: '',
    });

    axios
      .get("")
      .then(res => {
          const currentCompany = {
              name: 'test name',
              profile_pic: 'test pro pic',
              description: 'test description',
              is_approved: false,
              comp_website: 'test website',
          }
      })
      .catch(err => console.error(err));
    const logout = ()=>{
        auth.logout();
        localStorage.removeItem('token');
        history.push('/');
    }
    return(
        <div className="profile-content">
            <div className="row">
                <div className="profile-logo">
                    <img src={logo} alt="company logo"/>
                </div>
                <div className="profile-description">
                    <div className="row top-description">
                    <div className="profile-comp-name">Company name</div>
                    <div className="approve">not approved by pdc yet</div>
                    </div>
                
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nulla repudiandae excepturi omnis natus tempora earum esse! Illum, autem eos! Molestiae, iusto adipisci delectus consequuntur aperiam officia quis repellat cupiditate!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus id illo blanditiis, quisquam quasi, possimus hic doloribus laudantium assumenda molestias, cupiditate inventore animi rerum a quia quam quo sequi adipisci?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, ut, mollitia sapiente cupiditate debitis voluptates doloribus dolor iste, dolore incidunt ad iure? Eos, voluptatum ea. Voluptates aperiam sit corporis ducimus?
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, hic culpa! Saepe sed hic dicta! Perferendis facilis reprehenderit est totam rerum laudantium, et distinctio. Odio, officia atque? Corporis, id quaerat.
                    </div>
                    <div><a href="www.companyname.com">www.companyname.com</a></div>
                </div>
            </div>
            <div className="row profile-btn">
                <div>
                <button className="btn btn-primary">Details</button>
                <button className="btn btn-primary">Notifications</button>
                <button className="btn btn-primary">Advertiesments</button>
                </div>
                <button className="btn btn-secondary" onClick={logout}>Logout</button>
            </div>
        </div>
    );
}

export default Profile;