
const exp=require("express");
const studentApp=exp.Router();



const expressAsyncHandler=require('express-async-handler');





studentApp.use(exp.json());
studentApp.post("/Register",expressAsyncHandler(async(request,response)=>{
    const studentcollection=request.app.get('studentcollection');


    const newUser=request.body;

    let products=await studentcollection.find().toArray()

    let x=products[0].userData;

    x.push(newUser);
    // console.log("  afet puh",x)

    // console.log("in back end",newUser)

    
    await studentcollection.updateMany({ id:1},{$set :{userData:x}})

    response.status(201).send({message:"user created"})
   

}))



studentApp.use(exp.json());
studentApp.post("/UserProfile",expressAsyncHandler(async(request,response)=>{
    const studentcollection=request.app.get('studentcollection');


    const newUser=request.body;
    // console.log("after send",newUser)

    let products=await studentcollection.find().toArray();
    products=products[0].userData

    // console.log("pro are  ",products)

    p=[]
    for(i=0;i<products.length;i++){
        if(products[i].company===newUser.company){
        p.push(products[i]);
        }
    }

    // console.log(" p is ",p)

    
    response.status(200).send({message:"user list",user:p});
   

}))


studentApp.use(exp.json());
studentApp.post("/Cart1",expressAsyncHandler(async(request,response)=>{
    const studentcollection=request.app.get('studentcollection');

    const newUser=request.body;


   console.log("in back",newUser.deleteUser);
    let products=await studentcollection.find().toArray();

     products=products[0].userData;

     console.log("bef del",products)
    for(i=0;i<products.length;i++){
        if(products[i].email===newUser.deleteUser.email  &&  products[i].username===newUser.deleteUser.username){
            products.splice(i,1);
        
        }
    }

    console.log("aft del",products)


  await studentcollection.updateMany({ id:1},{$set :{userData:products}})



  let product=await studentcollection.find().toArray();
  product=product[0].userData

  console.log("pro are  ",product)

  p=[]
  for(i=0;i<product.length;i++){
      if(product[i].company===newUser.company){
      p.push(product[i]);
      }
  }

  console.log(" p is ",p)

  
  response.status(200).send({message:"user list",user:p});


    


   

}))











module.exports=studentApp;