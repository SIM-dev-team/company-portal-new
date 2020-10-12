import React,{useState , useEffect} from 'react';
// import { useHistory , Link } from "react-router-dom";
// import auth from '../Auth';
// import { Form , Col } from 'react-bootstrap';
// import { useFormik } from 'formik';
import axios from 'axios';
// import default_logo from '../assets/images/profile_pic_default.png';
// import { BeatLoader } from 'react-spinners';
import profiles from '../components/studentProfiles'
import Student from '../components/studentProfiles';

function ViewApplicants({match}){

    const [applicantsList , setApplicantsList] = useState([]);

    useEffect(()=>{
        axios
          .post("http://localhost:5000/advert/getStudents" , {a_id: match.params.id})
          .then(res => {
              console.log(res.data);
              setApplicantsList(res.data);
          })
          .catch(err => console.error(err));
    },[]);
    return(
        <div className="view-applicants-content">
           <div className="view-applicants-content-header">Applicants for the Advertiesment</div>
           <hr/>
           {applicantsList.map((stdnt)=>{
               return(
                   <Student key={stdnt.id} student={stdnt}/>
               );
           })}
        </div>
    );
}

export default ViewApplicants;