import React , {useState , useEffect} from 'react'
import '../App.css';
import axios from 'axios'

function Project(params) {

    const [project , setProject] = useState([]);

    useEffect(()=>{
        axios
          .get(`http://localhost:5000/student/getProject/${params.id}`)
          .then(res => {
              setProject(res.data);
              console.log(res.data)
            } )
          .catch(err => console.error(err));
    },[params])

    return (
        <div>
           <div className="project">
                <div className="project-name">{project.name}</div> 
                <div className="project-desc">{project.description}</div>
                <div className="project-tech">{project.tech_stack}</div>
                <div className="project-link">{project.link}</div>
           </div>
        </div>
    )
}

export default Project