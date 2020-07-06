import React from 'react';
import logo from '../assets/images/ucsc_logo.png';
import {Link} from 'react-router-dom';
import auth from '../Auth';

function Welcome(){
    return(
        <div className="content">
            <div className="row">
            {/* <h3>Professional Development Center of University of Colombo School of Compuling</h3> */}
                <div className="col-md-6 welcome-details">
                    <div className="welcome-text">WELCOME to PDC</div>
                    <hr/>
                <p>
                <strong>
                  The University of Colombo School of Computing ( UCSC ) 
                </strong>
                 is a higher educational institute affiliated to the University
                of Colombo in Sri Lanka providing Computer Science, Information
                Systems and Information and Communication Technology education.
                The UCSC is considered as the leading computing higher
                educational institution in Sri Lanka.
                <br />
                <strong>The Professional Development Centre (PDC)</strong> is
                one of the centers at UCSC, established to keep a close liaison
                with the IT industry to improve the academic activities through
                industry-academia partnership. The mission of the Professional
                Development Center is to produce socially responsible
                professionals with entrepreneurial skills, leadership qualities,
                and integrity. The center facilitates training programs to
                improve the professional skills of both the academic staff and
                the undergraduates. The PDC invites the IT industry to conduct
                awareness programs such as current trends in the IT industry,
                industrial practices, career paths in various disciplines, and,
                thus, creating value addition to enhance overall graduate
                quality and employability.
              </p>
                    <div className="row two-btn" hidden={auth.isAuthenticated()}>
                    <div>
                       <Link to="/register"><div className="btn btn-primary">Register</div></Link> 
                    </div>
                    <div>
                       <Link to="/login"><div className="btn btn-primary">Login</div></Link> 
                    </div>
                    </div>
                    <div className="empty-box-logged-in" hidden={!auth.isAuthenticated()}>

                    </div>
                   
                </div>
                <div className="col-md-4">
                    <img className="welcome-image" src={logo} alt=""/>
                </div>
            </div>
        </div>
    );
}

export default Welcome;