const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var flag=0;
var flag1=0;

//connecting to mongodb server (to a user specified account)
mongoose.connect("mongodb+srv://madhukumara:madhu@cluster0.hq4oe.mongodb.net/contact", { useNewUrlParser: true, useUnifiedTopology: true })
.catch((err) => {
    console.log("oh! no mongo not conntected");
    console.log(err);
    flag=1;
    flag1=1;
});


const contactSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  phone: Number
});

const subscriberSchema = new mongoose.Schema(
  {
    email: String
  }
);

const contact = mongoose.model('contact', contactSchema);

const subscriber = mongoose.model("subscriber",subscriberSchema);

app.post("/submit",(req,res)=>{
  if(flag==0){
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const phone = req.body.phone;
    const newcontact = new contact({ fname,lname,email,phone});
    newcontact.save(function (err) {
      if(err){
          res.render("servererr");
          flag=0;
      }
    });
    res.render("submit");
  }
  else{
    res.render("servererr");
    flag=0;
  }
});

app.post("/read_more",function(req,res){
  res.render("read_more");
});

app.post("/all_pricings",function(req,res){
  res.render("all_pricings");
});

app.post("/subscribe",function(req,res){
  if(flag1==0){
    const email = req.body.email1;
    const newsubscriber = new subscriber({email});

    newsubscriber.save(function (err) {
      if(err){
          res.render("servererr");
          flag1=0
      }
    });

    res.render("subscribe");
  }
  else{
    res.render("servererr");
    flag1=0;
  }
});

app.get("/",function(req,res){
  res.render("index");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
