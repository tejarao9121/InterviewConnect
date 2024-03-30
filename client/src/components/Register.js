import React, { useState } from 'react'
import './Register.css'
import { useForm } from "react-hook-form"
import axios from 'axios';
import {useNavigate} from "react-router-dom"

function Register () {

  let [err,setErr]=useState("")

  //navi
  const navigate =useNavigate()
  
  let { register, handleSubmit, formState: { errors } } = useForm();



  const sendEmail = (e) => {
    e.preventDefault();

   
    

    const userObj={

      email:e.target.email.value,
      username:e.target.username.value,
      year:e.target.year.value,
      name:e.target.name.value,
      branch:e.target.branch.value,
      job:e.target.job.value,
      company:e.target.company.value,
      resume:e.target.resume.value

      
    }



  let f=async()=>{

    console.log("befor send",userObj)
    
    let response= await axios.post("http://localhost:4000/student-api/Register",userObj)
    let data=response.data
    console.log(data,"in register...")

    if(data.message==="user created"){


     
      navigate('/');
      
    }
    else{
      setErr(data.message)
    }


}
 f()


  }

  return (
    
    <div>
      <h1>Register</h1>
      { ((err==="username already exist" || err==="username and email already exist") || err==="email already exist")  && (
        <p className='display-3 text-danger text-centre'>{err}</p>
      )}
      <div className='container'>
      
     
        

        <form  onSubmit={sendEmail} className='w-75'  >


        <div className="form-group text-start ">
            <label htmlFor="email" className='mt-2 '>Email:</label>
            <input type="email" className="form-control mt-2" id='email'  placeholder="Enter a valid email"  {...register("email", { required: true })}></input>
           {/* {err.name?.type === "required" && (
              <p className='text-danger fw-blod fs-5'>Email is required</p>
            )} */}

          </div>

          <div className="form-group mt-3 text-start">
            <label htmlFor='username'>Username:</label>
            <input type="text" className="form-control mt-2" id="username" placeholder="" name='username' {...register("username", { required: true })}></input>
          </div>
  
          <div className="form-group mt-3 text-start">
            <label htmlFor='name'>Name:</label>
            <input type="text" className="form-control mt-2" id="name" placeholder="Enter full name" name='name' {...register("name", { required: true })}></input>
          </div>

         {/* <div className="form-group mt-3 text-start">
            <label htmlFor="year">Year:</label>
            <input type="text" className="form-control mt-2" id="year" name='year'  placeholder="studying in" {...register("year", { required: true })}></input>
          </div> 
         */}

          <div className="form-group mt-3 text-start">
            <label>Year pursuing:</label><br/>
            <input type="radio" id="firstYear" name="year" value="1" {...register("year", { required: true })} />
            <label htmlFor="firstYear">1st year</label>&nbsp;&nbsp;&nbsp;
            <input type="radio" id="secondYear" name="year" value="2" {...register("year", { required: true })} />
            <label htmlFor="secondYear">2nd year</label>&nbsp;&nbsp;&nbsp;
            <input type="radio" id="thirdYear" name="year" value="3" {...register("year", { required: true })} />
            <label htmlFor="thirdYear">3rd year</label>&nbsp;&nbsp;&nbsp;
            <input type="radio" id="fourthYear" name="year" value="4" {...register("year", { required: true })} />
            <label htmlFor="fourthYear">4th year</label>&nbsp;&nbsp;&nbsp;
          </div>

          <div className="form-group mt-3 text-start">
            <label htmlFor="branch">Branch:</label>
            <input type="text" className="form-control mt-2" id="branch" name='branch' placeholder="Enter branch"  {...register("branch", { required: true })}></input>
          </div>

          <div className="form-group mt-3 text-start">
            <label htmlFor="company">Company:</label>
            <input type="text" className="form-control mt-2" id="company" name='company' placeholder="Enter interviewing company  "  {...register("company", { required: true })}></input>
          </div>
          <div className="form-group mt-3 text-start">
            <label htmlFor="job">Job Title:</label>
            <input type="text" className="form-control mt-2" id="job" name='job' placeholder="Enter title of job"  {...register("job", { required: true })}></input>
          </div>
          
          <div className="form-group mt-3 text-start">
            <label htmlFor="resume">Provide Resume:</label>
            <input type="file" className="form-control mt-2" id="resume" name='resume'  {...register("resume", { required: true })}></input>
          </div>
          
          
          
          <input type="submit" className="btn btn-primary mt-3" value="register" /> 
          </form>
         
        












      </div>








    </div>
  )
}


export default Register
