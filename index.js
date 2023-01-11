import { MongoClient } from 'mongodb';
import express from 'express'
import bodyParser from 'body-parser'


const app=express()
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("Welcome Onkar")
})

app.get('/customer',(req,res)=>{
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    var dbo = db.db("clientDatabase");
    var query = { };
    dbo.collection("customer").find(query).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      db.close();
    });

  });
})


app.get('/customer/:id',(req,res)=>{ 
 
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    var dbo = db.db("clientDatabase");
    var query = { name: req.params.id };
    dbo.collection("customer").find(query,{ _id:0}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result)
      db.close();
    });

  });
})

app.listen(3000)



