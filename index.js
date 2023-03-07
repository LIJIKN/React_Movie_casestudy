  const express = require ("express");
 
  const Collection = require ('./model/movieDb');

  const app = new express();

  const path = require ('path')

app.use(express.urlencoded({
  extended : true
}))
app.use(express.json());
app.use(express.static(path.join(__dirname,'/build')))
//CORS policy

app.use((req,res,next)=>{
res.setHeader("Access-Control-Allow-Origin","*")
res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")
res.setHeader("Access-Control-Allow-Headers","X-Requested-With,content-type")
res.setHeader("Access-Control-Allow-Credentials",true)
next()
})


    app.get('/' , (req,res)=>{
          res.send("server is up")
     })

     app.get('/about' , (req,res)=>{
        res.send("Hai,,liji...")
   })


   app.post('/api/addmovie' , (req,res) =>{
  
   console.log( req.body);
         const list =  Collection(req.body); // passing the data to db
         list.save() // save to db
   
   res.send("Data Sent");
  
   
   });

   app.get('/api/view', async (req,res) =>{
    try{
let result = await Collection.find();
res.json(result)
    }
    catch(error){
      res.send(error)
    }
   })

   //update

   app.post('/api/update', async(req,res) =>{
    try{
      let result = await  Collection.findByIdAndUpdate(req.body._id, req.body)
      
     
     res.send("data updated")
    }
catch   (error){
  res.send(error)
}                        
   })

//Delate
app.post('/api/delate',async(req,res) =>{
  await Collection.findByIdAndDelete(req.body._id);
  res.send("data delated")
})

//search
app.post('/api/search' ,async(req,res) =>{
//  let result = await Collection.find(req.body)
  let result = await Collection.find({"MovieName":{$regex: '.*' + req.body.MovieName + '.*'}})
 res.json(result)
} )

app.get('/*',function(req,res){
  res.sendFile(path.join(__dirname,'/build/index.html'))
})

 app.listen(5000,()=>{
    console.log("srever is running in 5000")
 })