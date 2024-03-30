import React,{useContext} from 'react'
import { LoginContext } from '../contexts/LoginContext';
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import './UserProfile.css'

function  UserProfile () {


    let [finalProducts,setfinalProducts]=useState([])


  
    const [location, setLocation] = useState(null);
    let { register, handleSubmit, formState: { errors } } = useForm();


    let [currentUser,err,userLoginStatus,loginUser,logutUser]= useContext(LoginContext);


    const addUser = (userObj) => {

        let f=async()=>{


          console.log("befor",userObj)
          
          
           let response= await axios.post("http://localhost:4000/student-api/UserProfile",userObj)
           let data=response.data
           
           const x=data.user
          
           setfinalProducts(x);
    
         
    
      
      }
        f()

    }

    let onDeleteUser =async(item)=>{
      const result={
        deleteUser:item
      }
      console.log("sending in cart",result);
      
      let response = await axios.post("http://localhost:4000/student-api/Cart1", result)
      let finalUsers=response.data
      console.log("in cart is",finalUsers);

      setfinalProducts(finalUsers.user);
      
  
    }






  return (
    <div>

    <h2>Welcome Back!</h2>


    <form className='container-fluid form' onSubmit={handleSubmit(addUser)}>
          
          
        <div className="form-group serch">
          <input type="text" id='company' className="form-control rounded mt-5" placeholder="Search for company"  {...register("company", { required: true })}/>
          <button type="submit" className="btn btn-danger mt-4">search</button>
          
          
        </div>
        </form>




        <div   className='f mt-5'>
           { finalProducts.length!=0?
          finalProducts.map((item,index)=>{
            return(
            
               <div className="card  z ml-4 ">
               <div className="card-body mt-4 text-start  ">
              
            <div key={index} >
          {Object.keys(item).map((key) => (
              <div key={key}>
              <h2><b>{key}</b> : {item[key]}</h2>


              
              
            </div>



              ))}
              <button  onClick={()=>onDeleteUser(item)} className="but btn btn-primary" >Accept</button>
              

             
        </div>
  
          
            </div>
            </div>
           
             
            )
          }) :<div className='k'><h1 className='mt-5 t'> Empty</h1></div>

          
          } 
          

          




</div>
      
    </div>
  )
}

export default UserProfile
