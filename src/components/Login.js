import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';



const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const host = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
  const handleSubmit = async (e) => {
    e.preventDefault();
    //fetch("http://localhost:5000/api/auth/login")
    const response = await fetch(`${host}/api/auth/login`, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    
    // Check if the response is ok before trying to parse JSON
    if (!response.ok) {
      // If it's not ok, try to get the error text
      const errorText = await response.text();
      console.error("Server error:", errorText);
      props.showAlert("Server error occurred. Please try again later.","danger");
      return;
    }
    
    // If response is ok, parse JSON
    const json = await response.json();
    console.log(json);
    if(json.success){
      //save the token and redirect
      localStorage.setItem('authToken', json.authToken);
      props.showAlert("Logged in successfully","success");
      navigate("/");
    }
    else{
      props.showAlert("Invalid details","danger");
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
}
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id='password' value={credentials.password}
          onChange={onChange} name="password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login
