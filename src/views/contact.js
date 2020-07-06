import React from 'react';

function Contact(){
    return(
        <div className="register-background">
        <div className="contact-content">
            <div className="contact">Contact PDC</div>
            <hr/>
            <div>
            <strong className="field-name">Address</strong><br/>
                <div >
                Professional Development Centre,<br/>
                University of Colombo School of Computing,<br/>
                35, Reid Avenue ,<br/>Colombo 7
                </div>
                <br></br>
            <strong className="field-name">e-mail </strong>
            <div>pdc@ucsc.cmb.ac.lk</div>
            <br/>

            <strong className="field-name">Telephone</strong>
             <div>
             +94 -011-2158912 / 2158969
             </div>
            <br/>
            <strong className="field-name">Fax</strong>
            <div>+94-1-2587239</div>
            
        </div>
        </div>
        </div>
    );
}

export default Contact;