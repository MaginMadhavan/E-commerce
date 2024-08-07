import React,{useState} from 'react'
import Layout from '../../componets/Layouts/Layout'
import toast from "react-hot-toast";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../../styles/AuthStyles.css'
import { useAuth } from '../../context/auth';

const Login = () => {

    const [email,setMail]=useState("");
   
    const [password,setPassword]=useState("");
    const [auth,setAuth] = useAuth();
    const navigate= useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
          const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, { email, password});
          if(res.data.success){
            toast.success(res.data.message)
            setAuth({
              ...auth,
              user:res.data.user,
              token:res.data.token,
            })
            localStorage.setItem('auth', JSON.stringify(res.data));
            navigate('/');
          }
          else{
            toast.error(res.data.message)
          }
        }
        catch(error){
          console.log(error);
          toast.error('Something went wrong')
        }
    }

  return (
    <Layout title="Register">
    <div className="form-container">
   <div>
<h1 className="title">Login Form</h1>
<form onSubmit={handleSubmit}>

<div className="mb-3">
  <input required placeholder="Email" type="email" className="form-control" id="exampleInputMail" value={email}onChange={(e)=>setMail(e.target.value)} />
</div>


<div className="mb-3">
  <input required placeholder="Password" type="password" className="form-control" id="exampleInputPassword" value={password} onChange={(e)=>setPassword(e.target.value)}/>
</div>

<button type="submit" className="btn btn-primary">Login</button>
</form>
</div>


    </div>
</Layout>
  )
}

export default Login
