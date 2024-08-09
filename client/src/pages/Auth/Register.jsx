//rafce - react arrow function with export

import React,{useState} from 'react'
import Layout from '../../components/Layouts/Layout'
import toast from "react-hot-toast";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../../styles/AuthStyles.css'


const Register = () => {

    const [name,setName]=useState("");
    const [email,setMail]=useState("");
    const [phone,setPhone]=useState("");
    const [address,setAddress]=useState("");
    const [answer,setAnswer]=useState("");
    const [password,setPassword]=useState("");
    const navigate= useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
          const res = await axios.post(`http://localhost:8080/api/v1/auth/register`, { name, email, password, address,answer, phone });
          if(res.data.success){
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
    <Layout title="Register">
        <div className="form-container">
       <div>
  <h1 className="title">Register Page</h1>
  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <input required placeholder="Name" type="text" className="form-control" id="exampleInputName" value={name} onChange={(e)=>setName(e.target.value)}/>
    </div>
    <div className="mb-3">
      <input required placeholder="Email" type="email" className="form-control" id="exampleInputMail" value={email}onChange={(e)=>setMail(e.target.value)} />
    </div>
    <div className="mb-3">
      <input required placeholder="Phone Number" type="text" className="form-control" id="exampleInputPhone" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
    </div>
    <div className="mb-3">
      <input required placeholder="Address" type="text" className="form-control" id="exampleInputAddress" value={address} onChange={(e)=>setAddress(e.target.value)}/>
    </div>
    <div className="mb-3">
      <input required placeholder="Favorite Color ?" type="text" className="form-control" id="exampleInputAnswer" value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
    </div>
    <div className="mb-3">
      <input required placeholder="Password" type="password" className="form-control" id="exampleInputPassword" value={password} onChange={(e)=>setPassword(e.target.value)}/>
    </div>
    
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
</div>


        </div>
    </Layout>
  )
}

export default Register
