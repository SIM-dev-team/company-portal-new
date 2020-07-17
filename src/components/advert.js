import React from 'react';

function advert() {
    return (
        <div>
            <div className="card-ad">
                <div className="row ad-row">
                    <div className="role-name">Job role</div>
                    <div className="is-approved">not approved</div>
                </div>
                <div className="ad-description">description</div>
                <div className="ad-positions">no of positions : 3 </div>
                <div className="ad-positions">no of applicants : 0 </div>
               <div className="row"><button className="ad-view-applicants">View applicants</button><button className="ad-view-more">View more</button></div> 
            </div>
        </div>
    )
}

export default advert

