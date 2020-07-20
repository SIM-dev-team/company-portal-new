import React,{useState} from 'react';
import Model from 'react-modal';

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
Model.setAppElement('#root');
function Advert(props) {
    const [isAdvertModelOpen , setIsAdvertModelOpen] = useState(false);
    console.log(props.advert)
    return (
        <div>
            <div className="card-ad">
                <div className="row ad-row">
                <div className="role-name">{props.advert.internship_position}</div>
                    <div className="is-approved">{props.advert.status}</div>
                </div>
                <div className="ad-description">{props.advert.position_desc}</div>
                <div className="ad-positions">no of positions : {props.advert.no_of_positions} </div>
                <div className="ad-positions">no of applicants : {props.advert.no_of_applicants}</div>
               <div className="row"><button className="ad-view-applicants" disabled={ props.advert.no_of_applicants === 0}>View applicants</button><button className="ad-view-more" onClick={()=>setIsAdvertModelOpen(true)}>View more</button></div> 
            </div>
            <Model isOpen={isAdvertModelOpen} style={modalStyles}>
                {props.advert.ad_id}
            </Model>
        </div>
    )
}

export default Advert

