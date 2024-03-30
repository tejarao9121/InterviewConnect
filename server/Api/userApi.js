
const exp=require("express");
const userApp=exp.Router();

const bcryptjs=require('bcryptjs');
const jwt=require("jsonwebtoken")

const expressAsyncHandler=require('express-async-handler');


const VerifyToken=require("./VerifyToken")



userApp.use(exp.json());
userApp.post("/ExpertRegister",expressAsyncHandler(async(request,response)=>{
    const usercollection=request.app.get('usercollection');
   


    const newUser=request.body;
    console.log("in backend",newUser)
     
    const p= await usercollection.findOne({username:newUser.username})
    const q= await usercollection.findOne({email:newUser.email})

    if(p===null && q===null){
    let hashedPass=await bcryptjs.hash(newUser.password,6)
    newUser.password=hashedPass
    // users.push(newUser);

    await usercollection.insertOne(newUser)

    response.status(201).send({message:"user created"})
    } else if(p===null && q!=null){
        response.status(200).send({message:"email already exist"})
    }
    else if(p!=null && q===null){
        response.status(200).send({message:"username already exist"})

    }
    else{
        response.status(200).send({message:"username and email already exist"})

    }

}))


userApp.use(exp.json());
userApp.post("/Login",expressAsyncHandler(async(request,response)=>{
    const usercollection=request.app.get('usercollection');


    const logiUser=request.body;
 

    const userOfDb= await usercollection.findOne({username:logiUser.username})
   
    
    if(userOfDb===null){
        response.status(200).send({message:"invalid username"})
    }
    else
    {
        let isEqual=await bcryptjs.compare(logiUser.password,userOfDb.password)
         if(isEqual===false){
            response.status(200).send({message:"invalid password"})
         }
         else{
              let signedToken=jwt.sign({username:userOfDb.username},'abcdef',{expiresIn:4000})

              response.status(200).send({message:"success",token:signedToken,user:logiUser})



         }
    }
   

    

}))









module.exports=userApp;