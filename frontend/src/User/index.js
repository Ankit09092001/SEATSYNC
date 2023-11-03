const express = require("express");
const {userp,admin,tc} = require("./mongo");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
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
  };

  try {
    const check = await userp.findOne({ email: email });
    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await userp.insertMany([data]);
    }
  } catch (e) {
    res.json("notexist");
  }
});

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
