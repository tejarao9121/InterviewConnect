const exp =require("express");
const app=exp()



app.listen(4000,()=>{
    console.log("server is porting");
})

const cors = require('cors');

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});


const mclient=require('mongodb').MongoClient;

mclient.connect('mongodb://127.0.0.1:27017/MockIntAppdb')
.then(dbRef=>{
   
    let dbobj=dbRef.db('MockIntAppdb')
    
    let usercollection=dbobj.collection("usercollection")
    let studentcollection=dbobj.collection("studentcollection")
    let expertcollection=dbobj.collection("expertcollection");

    app.set("usercollection",usercollection)
    app.set("studentcollection",studentcollection)
    app.set("expertcollection",expertcollection)
   
    console.log("connected successfully to db")
    
})
.catch(err=>console.log("database connection err is",err))



const userApp=require("./Api/userApi");

const studentApp=require("./Api/studentApi");
const expertApp=require("./Api/expertApi");

app.use("/user-api",userApp);
app.use("/student-api",studentApp);
// app.use("/student-api",expertApp);






const invaildPathHandlingMiddleware=(request,response,next)=>{
    response.send({message:"invalid path"});

};
app.use(invaildPathHandlingMiddleware);


const errHandler=(error,request,response,next)=>{
    response.send({"error-message: ":error.message})

}
app.use(errHandler);