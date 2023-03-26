import React ,{useEffect,useState} from 'react'
import './Signupc1.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "bootstrap/dist/css/bootstrap.css";
import { Link,useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorMessage from './ErrorMessage';
import axios from 'axios';
const Signupc1 = () => {
const history = useNavigate();
    const [name,setusername] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [phonenumber,setphonenumber] = useState("");
    const [loading,setloading] = useState(false);
    const [error,seterror] = useState(false);

    useEffect(() => {
      const userInfo = localStorage.getItem("userInfo");
       
        if(userInfo){
          history("/dash");
        }

    },[history])


    const submitHandler = async(e) => {
e.preventDefault();
try {
  const config = {
    headers: {
      "Content-type":"application/json"
    },
  };
  setloading(true);
  const {data} = await axios.post(
    "/users",
  { 
    name,
    email,
   password,
   phonenumber,
   },
   config
  );
  console.log(data);
  localStorage.setItem('userInfo',JSON.stringify(data));
  seterror(false);
  setloading(false);
  }
  catch(error){
      seterror(error.response.data.message);
      console.log(error.response.data.message);
      setloading(false);
  } 
    
    
        
      setusername("");
      setemail("");
      setpassword("");
      setphonenumber("");

      window.location.reload(false);
 

}

  return (
   <div className='d-flex'>
   
              <div>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                alt="Sample photo"
                className="picsign" />
            </div>
            <div className='signup'>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              {loading && <Loading></Loading>}
            <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>User Name</Form.Label>
        <Form.Control type="text" value={name} placeholder="user name" onChange={(e) => setusername(e.target.value) } autoComplete="off" />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => setemail(e.target.value) } autoComplete="off" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setpassword(e.target.value) } autoComplete='off' />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Phone number</Form.Label>
        <Form.Control type="number" value={phonenumber} placeholder="Phone number" onChange={(e) => setphonenumber(e.target.value) } autoComplete='off' />
        <Form.Text className="text-muted">
         Existing User? then <Link to="/" style={{textDecoration: 'none'}}> Login </Link>
        </Form.Text>
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
            </div>
    </div>
       
  )
}

export default Signupc1
