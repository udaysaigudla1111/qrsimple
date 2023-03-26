import React, { useEffect, useState } from 'react'
import '../pages/Login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "bootstrap/dist/css/bootstrap.css";
import { Link,useNavigate } from 'react-router-dom';
import loginpic from '../images/loginpic.jpg'
import Loading from '../components/Loading';
import axios from 'axios';
import ErrorMessage from '../components/ErrorMessage';
 
const Login = () => {

      const [email,setEmail] = useState("");
      const [password,setPassword] = useState("");
      const [loading,setloading] = useState(false);
      const [Error,setError] = useState(false);

      const history = useNavigate();
     

      useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
         
          if(userInfo){
            history("/dash");
          }

      },[history])

  const submitHandler = async (e) => {
    e.preventDefault();
     try {
    const config = {
      headers: {
        "Content-type":"application/json"
      },
    };
    setloading(true);

    const {data} = await axios.post(
      "/users/login",
    { 
      email,
     password,
     },
     config
    );

        console.log(data);
        localStorage.setItem('userInfo',JSON.stringify(data));
     setError(false)
    setloading(false);

     } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
      setloading(false);
     }
     

     setEmail("");
    setPassword("");

     if(Error==false){
        window.location.reload(false);
     }
    
   
   
  }

  return (
   <div className='d-flex'>
   
              <div>
              <img src={loginpic}
                alt="Sample photo"
                className="piclogin" />
            </div>
            <div className='login'>
              {Error && <ErrorMessage variant="danger">{Error}</ErrorMessage>}
             {loading && <Loading></Loading>}
            <Form onSubmit={submitHandler}>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value) } autoComplete='off' />
        <Form.Text className="text-muted">
         New User? then <Link to="/signup" style={{textDecoration: 'none'}}> Signup </Link>
        </Form.Text>
      </Form.Group>

     
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
            </div>
    </div>
       
  )
}

export default Login
