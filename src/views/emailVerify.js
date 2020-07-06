import React,{useState} from 'react';
import { Form,Card } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EmailVerify(){
  const history = useHistory();
    const [key, setKey] = useState({key : ''});
    const handleChange = (e) =>{
      setKey(e.target.value)
    }
    const submit = (e) =>{
      e.preventDefault();
      if(key.length > 5){
        axios
          .post("http://localhost:5000/auth/verifyEmail",{token : key})
          .then(res => {
            if(res.data === 'account verified successfully'){
              toast.success('Email verified successfully', {position: toast.POSITION.TOP_RIGHT});
              history.push('/login')
            }else if(res.data === 'Please enter a valid token'){
            toast.warning('Please enter a valid token', {position: toast.POSITION.TOP_RIGHT});
            }
            })
          .catch(err => {
            console.error(err)
            toast.error('Email verification failed', {position: toast.POSITION.TOP_RIGHT});
          });
      }
    }
    return(
      <div className="register-background">
        <div className="email-verify-content">
            <div className="email-verify-title">Email Verification</div>
            <Card className="jumbotron text-center">
              <Card.Text className="mt-4" style={{ fontSize: 18 }}>
                To Complete the your registration , please verify your email with the secret key that we have sent to your email
              </Card.Text>
              <Form>
                <Form.Group controlId="VerifyKey" className="ml-5">
                  <Form.Control
                    type="text"
                    placeholder="Verification Key"
                    className="text-center  center_input_box"
                    onChange= {handleChange}
                  ></Form.Control>
                </Form.Group>
              </Form>
              <button className="btn btn-primary " type="submit" onClick={submit}>
                Verify
              </button>
            </Card>
        </div>
        </div>
    );
}

export default EmailVerify;