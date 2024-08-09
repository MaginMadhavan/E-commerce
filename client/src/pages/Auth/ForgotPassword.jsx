import React,{useState} from 'react'
import Layout from '../../components/Layouts/Layout'
import toast from "react-hot-toast";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../../styles/AuthStyles.css'

const ForgotPassword = () => {
    const [email,setMail]=useState("");
   
    const [newPassword,setNewPassword]=useState("");
    const [answer,setAnswer]=useState("");

    const navigate= useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
          const res = await axios.post(`http://localhost:8080/api/v1/auth/forgot-password`, { email, newPassword, answer});

          if(res && res.data.success){
            toast.success(res.data.message)
            
            navigate('/login');
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
    <Layout title="Forgot Password">
    <div className="form-container">
   <div>
<h1 className="title">Reset Password</h1>
<form onSubmit={handleSubmit}>

<div className="mb-3">
  <input required placeholder="Email" type="email" className="form-control" id="exampleInputMail" value={email}onChange={(e)=>setMail(e.target.value)} />
</div>

<div className="mb-3">
  <input required placeholder="Your Favourite Color" type="text" className="form-control" id="exampleInputAnswer" value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
</div>

<div className="mb-3">
  <input required placeholder="Enter New Password" type="password" className="form-control" id="exampleInputNewPassword" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
</div>


<button type="submit" className="btn btn-primary">Reset</button>
</form>
</div>


    </div>
</Layout>
  )
}

export default ForgotPassword
