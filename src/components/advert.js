import React from 'react';

function advert(props) {
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
                <div className="ad-positions">no of applicants : 0 </div>
               <div className="row"><button className="ad-view-applicants">View applicants</button><button className="ad-view-more">View more</button></div> 
            </div>
        </div>
    )
}

export default advert

