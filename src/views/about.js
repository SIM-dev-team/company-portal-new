import React from 'react';
import logo from '../assets/images/ucsc_logo.png';

function About(){
    return(
        <div className="about-content">
        <img src={logo} alt="" className="about-background-img"/>
        <div className="about-content-text">
            <div className="about-content-title">About PDC</div>
            <hr/>
        <p>The Professional Development Centre (PDC) is one of the centers at UCSC, established to keep a close liaison with the IT industry to improve the academic activities through industry-academia partnership. The mission of the Professional Development Center is to produce socially responsible professionals with entrepreneurial skills, leadership qualities, and integrity. The center facilitates training programs to improve the professional skills of both the academic staff and the undergraduates. The PDC invites the IT industry to conduct awareness programs such as current trends in the IT industry, industrial practices, career paths in various disciplines, and, thus, creating value addition to enhance overall graduate quality and employability.
        </p>
        <strong>Main activities conducted by the Professional Development Center includes,</strong>
        <br/>
        <p>
        <strong>Tech Talks</strong><br/>
        Industry sessions conducted by professionals on technologies and practices currently being applied in the industry. Students in their 3rd year of undergraduate study are required to participate in these sessions to get an idea of the skills they should acquire before joining the industry.
        </p>
        <p>
        <strong>Industrial Placement Program</strong><br/>
        A 5-6 months program, where the students will be placed in different IT companies (registered under UCSC internship program) to give the exposure on the practical use of the knowledge they have acquired from the university curriculum. At the end of this period, students will be evaluated on their progress/achievements.
        </p>
        <p>
        <strong>Industrial Placement Monitoring Program</strong><br/>
        A team from UCSC will visit the places where the interns are placed after 2/3 months of their internship. During this visit, UCSC will get the opportunity to monitor the progress of the interns and to discuss any issues from the perspective of the student/company.    
        </p>
        </div>       
        </div>
    );
}

export default About;