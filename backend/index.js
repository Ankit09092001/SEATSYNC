const express = require("express");
const {userp,admin,tc} = require("./mongo");
const {UserVerification} = require("./UserVerification");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const nodemailer = require("nodemailer");
const {v4: uuid4} = require("uuid");
require("dotenv").config();
const path = require("path")

let transporter = nodemailer.createTransport({
  service:"gmail",
  secure: true,
  auth:{
    user:process.env.AUTH_EMAIL,
    pass:process.env.AUTH_PASS,
  }
})

transporter.verify((error,success)=>{
  if(error){
    console.log(error); 
  }
  else{
    console.log("Ready for message");
    console.log(success);
  }
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const user = {
    email:req.body.email,
    password:req.body.password
  }
  // const { email, password } = req.body;

  try {
    const userpage = await userp.findOne({ email: user.email });
    const adminpage = await admin.findOne({ email: user.email });
    const tcpage = await tc.findOne({ email: user.email });
    if (userpage) {
      jwt.sign({user:user},"secretkey",{expiresIn:"100s"},(err,token)=>{
        
        res.status(200).json({ status: "user", token: token });
      })
      // res.json("exist");
    }else if (adminpage) {
      jwt.sign({user:user},"secretkey",{expiresIn:"100s"},(err,token)=>{
        
        res.status(200).json({ status: "admin", token: token });
      })
      // res.json("exist");
    }else if (tcpage) {
      jwt.sign({user:user},"secretkey",{expiresIn:"100s"},(err,token)=>{
        
        res.status(200).json({ status: "tc", token: token });
      })
      // res.json("exist");
    }
     else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("notexist");
  }
});



app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const data = {
    email: email,
    password: password,
    verified:false,
  };

  try {
    const check = await userp.findOne({ email: email });
    if (check) {
      res.json("exist");
    } else {
      // res.json("notexist");
      // console.log("hii");
      await userp.insertMany([data]);
      let temp = await userp.find({email:email});
      // console.log(temp[0]._id); 
      data._id = temp[0]._id;
      sendVerificationEmail(data,res);
      
    }
  } catch (e) {
    res.json("notexist");
  }
});


const sendVerificationEmail = ({_id,email},res)=>{
  
  const currentUrl = "http://localhost:8000";
  const uniqueString = uuid4() + _id;
  console.log(_id);
  const mailOptions = {
    from:process.env.AUTH_EMAIL,
    to:email,
    subject:"Verify Your Email",
    html:`<p>Verify your email address to complete the signup and login into your account.</p> <p>This link <b>expires in 10 
    minutes.</b></p><p>Press <a href=${currentUrl + "/verify/" + _id + "/" + uniqueString}>here</a> to proceed.</p>`
  };
  const saltRounds = 10;
  bcrypt
  .hash(uniqueString,saltRounds)
  .then((hashedUniqueString) =>{
    const newVerification = new UserVerification({
      userId:_id,
      uniqueString : hashedUniqueString,
      createdAt:Date.now(),
      expiresAt : Date.now() + 600000,  
    });
    newVerification.save()
    .then( ()=>{
      transporter.sendMail(mailOptions)
      .then(()=>{
        res.json({
          status:"PENDING",
          message:"Verification Email Sent!!!",
        })
      })
      .catch((error)=>{
        res.json({
          status:"FAILED",
          message:"Verification email failed!",
        })
      })
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status:"FAILED",
        message:"Couldn't save verification email data!",
      })
    })
  })
  .catch(() =>{
    res.json({
      status:"FAILED",
      message:"An error occured while hashing email data!",
    })
  })
  console.log("hii");
};





app.get("/verify/:userId/:uniqueString",(req,res) =>{
  let {userId,uniqueString} = req.params;

  UserVerification.find({userId})
  .then((result)=>{
    if(result.length>0){
      const {expiresAt} = result[0];
      const hashedUniqueString = result[0].uniqueString;

      if(expiresAt < Date.now() ){
        UserVerification
        .deleteOne({userId})
        .then(result =>{
          userp.deleteOne({_id : userId})
            .then(()=>{
              let message ="Link has expired.Please sign up again.!!".
              res.redirect(`/user/verified/error=true&message=${message}`);
            })
            .catch(error =>{
              let message ="Clearing user with expired unique string falied!!".
              res.redirect(`/user/verified/error=true&message=${message}`);
            })
        })
        .catch((error) => {
          console.log(error);
          let message = "An error occured while clearing expired user verification record";
          res.redirect(`/user/verified/error=true&message=${message}`) 
        })
      }else{
          bcrypt.compare(uniqueString,hashedUniqueString)
          .then(result =>{
            if(result){
              userp.updateOne({_id:userId},{verified:true})
                  .then(()=>{
                    UserVerification.deleteOne({userId})
                    .then(()=>{
                      res.sendFile(path.join(__dirname,"/verified.html"))
                    })
                    .catch( error=>{
                      console.log(error);
                      let message ="An error occured while finalizing successful verification!!".
                      res.redirect(`/user/verified/error=true&message=${message}`);
                    })
                  })
                  .catch(error =>{
                    console.log(error);
                    let message ="An error occured while updating user record to show verified .!!".
                    res.redirect(`/user/verified/error=true&message=${message}`);
                  })
            }
            else{
              let message ="Invalidation verification details passed.check your inbox!!".
              res.redirect(`/user/verified/error=true&message=${message}`);
            }
          })
          .catch(error =>{
            let message ="An error occured while comparing unique strings!!".
            res.redirect(`/user/verified/error=true&message=${message}`);
          })
      }
    }else{
      let message = "Account recored doesn't exist or has been veridied already.Please sign up or log in. ";
    res.redirect(`/user/verified/error=true&message=${message}`) 
    }
  })
  .catch((error)=>{
    console.log(error);
    let message = "An error occured while checking for existing user verification record";
    res.redirect(`/user/verified/error=true&message=${message}`) 
  })
});

app.get("/verified",(req,res)=>{
  res.sendFile(path.join(__dirname,"/verified.html"))
})



app.post("/addtc", async (req, res) => {
  const { email, password } = req.body;
  const data = {
    email: email,
    password: password,
  };

  try {
    const check = await tc.findOne({ email: email });
    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await tc.insertMany([data]);
    }
  } catch (e) {
    res.json("notexist");
  }
});

app.get("/tcdata", async (req, res) => {
  try {
    const tcData = await tc.find(); // Fetch all data from the 'tc' collection
    res.status(200).json(tcData);
    console.log(tcData)
  } catch (e) {
    res.status(500).json({ error: "An error occurred while fetching data from the 'tc' collection." });
  }
});

app.listen(8000, () => {
  console.log("Port Connected");
});
