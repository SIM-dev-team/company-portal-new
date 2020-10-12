import React,{useState, useEffect} from 'react';
import Model from 'react-modal';
import axios from 'axios';
import Project from './ProjectsInvolved';

const modalStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      padding                : '20px',
      width                  : '60%',
      height                 : '80%'
    }
  };
Model.setAppElement('#root');
function Student(props) {
    const [studentDetails , setStudentDetails] = useState({});
    const [isProfileModelOpen , setIsProfileModelOpen] = useState(false);
    const [company , setCompany] = useState({
      name: '',
      profile_pic: '',
      description: '',
      is_approved: false,
      comp_website: '',
      contact_number: '',
      email: '',
      comp_id : '',
      fax_number: ''
  });

    useEffect(()=>{
      axios
    .get(`http://localhost:5000/company/get/${localStorage.getItem('token')}`)
    .then(res => {
        const currentCompany = {
            name: res.data.comp_name,
            description: res.data.description,
            is_approved:res.data.is_approved,
            comp_website: res.data.comp_website,
            contact_number: res.data.contact_number,
            email: res.data.email,
            comp_id: res.data.comp_id,
            fax_number : res.data.fax_number
        }
        setCompany(currentCompany);
    })
    .catch(err => console.error(err));
  }, [])

    useEffect(()=>{
      axios
        .post("http://localhost:5000/student/getStudentDataById" , {id: props.student.s_id})
        .then(res => {
          setStudentDetails(res.data);
          console.log(res.data);
        })
        .catch(err => console.error(err));
    },[])

    const selectApplicant = () =>{
      axios
        .post("http://localhost:5000/student/confirmApplicant",{comp_id : company.comp_id , reg_no : props.student.s_id , comp_name: company.name})
        .then(res => {
          console.log(res.data);
          window.location.reload();
        })
        .catch(err => console.error(err));
    }
    console.log(props.student);
    return (
        <div>
            <div className="student-card">
              
              <img src={studentDetails.profile_pic_url} alt="profile pic" className="student-card-profile-pic"/>
              <div className="student-card-name" >{studentDetails.name}</div>
              <div className="student-card-name">Current G.P.A : {studentDetails.current_gpa}</div>
              {
                studentDetails.confirmed_comp === company.comp_id ? 
                <div className="student-card-available">Confirmed Applicant</div> : 
                studentDetails.confirmed_comp === 0?
                <div className="student-card-available">available</div> : 
                <div className="student-card-unavailable">not available</div>
              }
              <button className="student-card-view-profile" onClick={()=>setIsProfileModelOpen(true)}>View profile</button>
            </div>
            <Model isOpen={isProfileModelOpen} style={modalStyles}>
              <div className="student-modal-header">
              <img src={studentDetails.profile_pic_url} alt="profile pic" className="student-modal-profile-pic"/>
              <div>
              <div className="student-card-name" >{studentDetails.name}</div>
              <div className="student-card-name">Current G.P.A : {studentDetails.current_gpa}</div>
              <div className="student-card-name">{studentDetails.email}</div>
              <div className="student-card-name">{studentDetails.contact}</div>
              </div>
              </div>
              <div className="student-modal-buttons">
              <button className="select-button" onClick={()=>selectApplicant()} hidden={studentDetails.confirmed_comp !== 0}>Select this applicant</button>
              <a href = {props.student.cv_link} target = "_blank"><button className="view-cv-button">View Cv</button></a>
              
              </div>
              <div><span className="student-card-name">Course :</span> {studentDetails.course === 1 ? 'Computer Science' : 'Information Systems'}</div>
              
              <div className="student-modal-topic">Interested Areas</div>
              <div className="student-modal-interested">
              <div className="interested-field">{studentDetails.interested_1 !== '' || studentDetails.interested_1 !== null ? studentDetails.interested_1 : ''}</div>
              <div className="interested-field">{studentDetails.interested_2 !== '' || studentDetails.interested_2 !== null ? studentDetails.interested_2 : ''}</div>
              <div className="interested-field">{studentDetails.interested_3 !== '' || studentDetails.interested_3 !== null ? studentDetails.interested_3 : ''}</div>
              
              </div>
              <div className="student-modal-topic">Projects Involved</div>
              {(studentDetails.projects_1 !== 0) ? <Project id = {studentDetails.projects_1}/> : ''}
              {(studentDetails.projects_2 !== 0) ? <Project id = {studentDetails.projects_2}/> : ''}
              {(studentDetails.projects_3 !== 0) ? <Project id = {studentDetails.projects_3}/> : ''}

              <button className="btn btn-primary"onClick={()=>setIsProfileModelOpen(false)}>Cancel</button>
              
            </Model>
        </div>
    )
}

export default Student