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
      padding                : '20px',
      width                  : '80%',
      height                 : '70%'
    }
  };
Model.setAppElement('#root');
function Advert(props) {
    const [isAdvertModelOpen , setIsAdvertModelOpen] = useState(false);
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
               <div className="row"><button className="ad-view-applicants" 
               disabled={ props.advert.no_of_applicants === 0}>View applicants</button><button className="ad-view-more" 
               onClick={
                   ()=>{
                       setIsAdvertModelOpen(true);
                       console.log(props.advert)
                    }
                   }>View more</button></div> 
            </div>
            <Model isOpen={isAdvertModelOpen} style={modalStyles}>
                <div className="view_more_advert row">
                    <div className="view_more_advert_details">
                    <div className="row view_more_advert_toprow">
                    <div className="view_more_advert_title">Advertiesment Details</div>
                    <div className={props.advert.status === 'approved' ? 'approved-advert' : 'pending-advert' }>{props.advert.status}</div>
                    </div>
                    <div className="row view_more_advert_toprow">
                    <div className="view_more_advert_position">{props.advert.internship_position}</div>
                    <div>Created Date: {props.advert.date_created}</div>
                    </div>
                    <div className="view_more_advert_label">Short description</div>
                    <div className="view_more_advert_data">{props.advert.position_desc}</div>

                    <div className="view_more_advert_label">Required knowladge skills</div>
                    <div className="view_more_advert_data">{props.advert.knowledge_skills}</div>

                    <div className="view_more_advert_label">Short description of the work to be done </div>
                    <div className="view_more_advert_data">{props.advert.job_desc}</div>

                    <div className="view_more_advert_label">Number of internship positions </div>
                    <div className="view_more_advert_data">{props.advert.no_of_positions}</div>

                    <div className="view_more_advert_label">Number of applicants so far </div>
                    <div className="view_more_advert_data">{props.advert.no_of_applicants}</div>

                    <button className="btn btn-info"onClick={()=>setIsAdvertModelOpen(false)}>Go Back</button>
                    </div>
                    <div className="view_more_advert_image">
                    <img src={props.advert.attachment_url} alt="Advert_image" style={{maxHeight:'500px',maxWidth:'550px'}}/>
                    </div>
                </div>
            </Model>
        </div>
    )
}

export default Advert

