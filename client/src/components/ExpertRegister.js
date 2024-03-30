import React, { useState } from 'react'
import './Register.css'
import { useForm } from "react-hook-form"
import axios from 'axios';
import {useNavigate} from "react-router-dom"

function  ExpertRegister ()  {


  let [err,setErr]=useState("")

  //navi
  const navigate =useNavigate()
  
  let { register, handleSubmit, formState: { errors } } = useForm();




  const sendEmail = (e) => {
    e.preventDefault();


    const userObj={
      email:e.target.email.value,
      username:e.target.username.value,
      password:e.target.password.value,
      name:e.target.name.value,
      company:e.target.company.value,
      job:e.target.job.value,
      proof:e.target.proof.value

    }


    console.log(userObj)


    let f=async()=>{

      console.log("befor send",userObj)
      
      let response= await axios.post("http://localhost:4000/user-api/ExpertRegister",userObj)
      let data=response.data
      console.log(data,"in register...")
      
      
  
      if(data.message==="user created"){
           

        alert("added succesfully...")
  
       
        navigate('/Login');
        
      }
      else{
        setErr(data.message)
      }
  
  
  }
   f()


  }



  return (
    


    <div>
      <h1> Expert Register</h1>
      { ((err==="username already exist" || err==="username and email already exist") || err==="email already exist")  && (
        <p className='display-3 text-danger text-centre'>{err}</p>
      )}
      <div className='container'>
      
     
        

        <form  onSubmit={sendEmail} className='w-75'  >
          
          
           <div className="form-group text-start ">
            <label htmlFor="email" className='mt-2 '>Enter Email:</label>
            <input type="email" className="form-control mt-2" id='email'   {...register("email", { required: true })}></input>
           {/* {err.name?.type === "required" && (
              <p className='text-danger fw-blod fs-5'>Email is required</p>
            )} */}

          </div>


          <div className="form-group mt-3 text-start">
            <label htmlFor="username">username:</label>
            <input type="text" className="form-control mt-2" id="proof" name='username'  {...register("username", { required: true })}></input>
          </div>
          
          <div className="form-group mt-3 text-start">
            <label htmlFor='name'>Full Name:</label>
            <input type="text" className="form-control mt-2" id="name" placeholder="Full Name" name='name'{...register("name", { required: true })}></input>
          </div>
          <div className="form-group mt-3 text-start">
            <label htmlFor="year">Enter Password:</label>
            <input type="password" className="form-control mt-2" id="Password" name='password'  {...register("password", { required: true })}></input>
          </div>
          <div className="form-group mt-3 text-start">
            <label htmlFor="company">Company Name:</label>
            <input type="text" className="form-control mt-2" id="company" name='company'  {...register("company", { required: true })}></input>
          </div>
          <div className="form-group mt-3 text-start">
            <label htmlFor="job">Job Role:</label>
            <input type="text" className="form-control mt-2" id="job" name='job'  {...register("job", { required: true })}></input>
          </div>
          {/* <div className="form-group mt-3 text-start">
            <label htmlFor="Experience">Experience:</label>
            <input type="Number" className="form-control mt-2" id="Experience" name='Experience'  {...register("Experience", { required: true })}></input>
          </div> */}
          <div className="form-group mt-3 text-start">
            <label htmlFor="proof">Proof:</label>
            <input type="text" className="form-control mt-2" id="proof" name='proof' placeholder="upload joining letter" {...register("proof", { required: true })}></input>
          </div>
         
          

          



         
            


          <input type="submit" className="btn btn-primary mt-3" value="register" /> 






          </form>
         
        












      </div>








    </div>




  )
}

export default ExpertRegister
