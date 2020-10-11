import React,{useState} from 'react';


function Notification(props) {
    return (
        <div>
            <div className="card-notify">
                <div className="row notify-row">
                <div className="column">
                <div className="notify-name">Notification Heading</div>
                <div className="notify-by" > send by</div>
                </div>
                <div>
                <button className="notify-close">Close</button>
                </div>
                </div>
                <div className="notify-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                </div>
        </div>
    )
}

export default Notification

