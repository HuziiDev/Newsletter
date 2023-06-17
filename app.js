const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const https=require("https");

const app=express();
app.use(express.static("public"));//this is to render css and images
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html" )
});
app.post("/", function(req,res){
    const firstName=req.body.fname;
    const lastName=req.body.lname;
    const email=req.body.email;
 const data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }
    ]
 };

 const jsonData=JSON.stringify(data);   //this will turn the above data in the form of json
 const url="https://us8.api.mailchimp.com/3.0/lists/b63d51e296";
 const options={
    method:"POST",
    auth:"Huzi:783793a55dc19005d1f1826fdcd6c0a9-us8"

 }
           
 const request=  https.request(url, options, function(response){
    if(response.statusCode===200){
        res.sendFile(__dirname + "/sucess.html" )
    }else{
        res.sendFile(__dirname + "/failure.html" )
    }
    response.on("data",function(data){
        console.log(JSON.parse(data))
    })
   
   })   
   request.write(jsonData);
   request.end();                    //make our request

});
app.post("/failure", function(req, res){
       res.redirect("/")
})

app.listen(process.env.PORT || 3000,function(){
    console.log("server is runnig on port 3000");
})
// 783793a55dc19005d1f1826fdcd6c0a9-us8        api key
// b63d51e296           list