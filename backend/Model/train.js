const mongoose = require("mongoose");
const express = require("express");
const router = express();
const moment = require("moment")
const nodemailer = require('nodemailer');

const SleeperSchema = new mongoose.Schema({
  Class: {
    type: String,
    default: "Sleeper",
  },
  Coach: {
    type: Number,
    default: 1,
  },
  Seat_No: {
    type: Number,
    default: 1,
  },
  Pname: {
    type: String,
    default: "NULL",
  },
  Gender: {
    type: String,
    default: "NULL",
  },
  Age: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    default: "NULL",
  },
  System_otp: {
    type: Number,
    default: 0,
  },
  Mail_otp: {
    type: Number,
    default: 0,
  },
  Start_No: {
    type: Number,
    default: 0,
  },
  Source: {
    type: String,
    default: "NULL",
  },
  Destination: {
    type: String,
    default: "NULL",
  },
  End_No: {
    type: Number,
    default: 0,
  },
  Deadline: {
    type: String,
  },
});

const ACSchema = new mongoose.Schema({
  Class: {
    type: String,
    default: "AC",
  },
  Coach: {
    type: Number,
    default: 1,
  },
  Seat_No: {
    type: Number,
    default: 0,
  },
  Pname: {
    type: String,
    default: "NULL",
  },
  Gender: {
    type: String,
    default: "NULL",
  },
  Age: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    default: "NULL",
  },
  System_otp: {
    type: Number,
    default: 0,
  },
  Mail_otp: {
    type: Number,
    default: 0,
  },
  Start_No: {
    type: Number,
    default: 0,
  },
  Source: {
    type: String,
    default: "NULL",
  },
  Destination: {
    type: String,
    default: "NULL",
  },
  End_No: {
    type: Number,
    default: 0,
  },
  Deadline: {
    type: String,
  },
});

// Define schema for Route
const RouteSchema = new mongoose.Schema({
  srNo: Number,
  stationName: String,
  distance: Number,
  station_time: String,
});

// Define Emergency Schema
const EmergencySchema = new mongoose.Schema({
  CoachNo: Number,
  SeatNo: Number,
});

// Define schema for Train
const TrainSchema = new mongoose.Schema({
  trainNo: {
    type: String,
    required: true,
    unique: true,
  },
  trainName: {
    type: String,
    required: true,
  },
  dateField: {
    type: String,
    default: "NULL",
  },
  Max_S_Coach: {
    type: Number,
    required: true,
  },
  Max_A_Coach: {
    type: Number,
    default: 0,
  },
  S_Seat_Available: {
    type: Number,
    default: function () {
      return this.Max_S_Coach * 16; // Set default based on Max_S_Coach value
    },
  },
  A_Seat_Available: {
    type: Number,
    default: function () {
      return this.Max_A_Coach * 16; // Set default based on Max_A_Coach value
    },
  },
  route: [RouteSchema],
  Sleeper: [SleeperSchema],
  AC: [ACSchema],
  Emergency: [EmergencySchema],
});

// Create models for Sleeper, AC, and Train

const Train = mongoose.model("Train", TrainSchema);

// Router to add the train
router.post("/add-train", async (req, res, next) => {
  const dummyData1 = {
    trainNo: "09876",
    trainName: "Pune Kohlapur Express",
    dateField: "2023-12-16",
    Max_S_Coach: 6,
    Max_A_Coach: 3,
    // Add route, sleeper, and AC data similar to dummyData1
  };

  // Function to insert dummy data 
  async function insertDummyData() {
    try {
      const newTrain = new Train(dummyData1);
      await newTrain.save();
      console.log("Dummy data inserted successfully.");
    } catch (error) {
      console.error("Error inserting dummy data:", error);
    }
  }
  insertDummyData();
});

// Router to add the Route in given train
router.post("/add-route", async (req, res, next) => {
  const trainNo = "09876";
  const trainData = await Train.findOne({ trainNo: trainNo });
  const routeData = {
    srNo: trainData.route.length + 1,
    stationName: "kohlapur",
    distance: 400,
    station_time: "09:00 PM",
  };
  async function addRouteData(trainNo) {
    const updatedTrain = await Train.findOneAndUpdate(
      { trainNo: trainNo },
      { $push: { route: { $each: [routeData] } } },
      { new: true }
    );
    console.log("Route added", updatedTrain);
  }
  addRouteData(trainNo);
});

// Router to add the Sleeper passengers
router.post("/add-S-passenger", async (req, res, next) => {
  console.log(req.body.trainAllData);
  let email = req.body.trainAllData.email
  const min = 1000;
  const max = 9999;
  // Generate a random number between min and max (inclusive)
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const trainNo = req.body.trainAllData.data.trainNo
  const sourceNo = req.body.trainAllData.data.sourceNo
  const endNo = req.body.trainAllData.data.destinationNo
  const sourceStation = req.body.trainAllData.source
  const destinationStation = req.body.trainAllData.destination
  const Class = req.body.Class

  const addMinutesToTime = (timeString,minutesToAdd)=>{
      const format = 'h:mm A';
      const initialTime = moment(timeString,format)
      const newTime = initialTime.add(minutesToAdd,'minutes');
      return newTime.format(format)
  }
  const startTime = req.body.trainAllData.data.startTime
  const deadlineTime = addMinutesToTime(startTime,30)
  const passengerData = req.body.passengerData
  res.status(200).json("ok");


  // Update the Train document with additional Sleeper data
  async function addSleeperDataToTrain(trainNo, additionalData) {
    try {
      // updateSeatValue(12345)
      const trainData = await Train.findOne({ trainNo: trainNo });
      let temp_seat = trainData.Sleeper.length;
      let curr_coach = Math.floor(temp_seat / 16) + 1;
      let curr_seat = (temp_seat % 16) + 1;
      additionalData[0].Coach = curr_coach;
      additionalData[0].Seat_No = curr_seat;
      let seat_Avail = trainData.S_Seat_Available - 1;

      const updatedTrain = await Train.findOneAndUpdate(
        { trainNo: trainNo },
        { $push: { Sleeper: { $each: additionalData } } },
        { new: true }
      );
      console.log("Updated Train:", updatedTrain);
      const updateSeatAvail = await Train.findOneAndUpdate(
        { trainNo: trainNo },
        {
          $set: {
            S_Seat_Available: seat_Avail,
          },
        },
        { new: true }
      );
    } catch (error) {
      console.error("Error updating Train:", error);
    }
  }


  async function addACDataToTrain(trainNo, additionalData) {
    try {
      // updateSeatValue(12345)
      const trainData = await Train.findOne({ trainNo: trainNo });
      let temp_seat = trainData.AC.length;
      let curr_coach = Math.floor(temp_seat / 16) + 1;
      let curr_seat = (temp_seat % 16) + 1;
      additionalData[0].Coach = curr_coach;
      additionalData[0].Seat_No = curr_seat;
      let seat_Avail = trainData.A_Seat_Available - 1;

      const updatedTrain = await Train.findOneAndUpdate(
        { trainNo: trainNo },
        { $push: { AC: { $each: additionalData } } },
        { new: true }
      );
      console.log("Updated Train:", updatedTrain);
      const updateSeatAvail = await Train.findOneAndUpdate(
        { trainNo: trainNo },
        {
          $set: {
            A_Seat_Available: seat_Avail,
          },
        },
        { new: true }
      );
    } catch (error) {
      console.error("Error updating Train:", error);
    }
  }


  // Call the function to add the new Sleeper data to the Train
async function addData(){
  for await (let passenger of passengerData ){
  const additionalSleeperData = [
    {
      Class:Class,
      Coach: 0,
      Seat_No: 0,
      Pname: passenger.name,
      Gender: passenger.gender,
      Age: passenger.age,
      email: email,
      System_otp: randomNumber,
      Start_No: sourceNo,
      End_No: endNo,
      Source: sourceStation,
      Destination: destinationStation,
      Deadline: deadlineTime
    },
     
    // Add more Sleeper data if needed
  ];
  console.log(Class)
    if(Class==="sleeper"){
     await addSleeperDataToTrain(trainNo, additionalSleeperData);
    }
    if(Class === "ac"){
      await addACDataToTrain(trainNo, additionalSleeperData);
    }
  console.log(additionalSleeperData)

  // code to send mail of tickets


}

}
await addData()

let ticketData=[]

if(Class==="sleeper"){
  async function findSleeperData(providedTrainNo, providedEmail) {
    try {
      const train = await Train.findOne({ trainNo: providedTrainNo }).populate({
        path: 'Sleeper',
        match: { email: providedEmail },
      });
  
      if (train && train.Sleeper && train.Sleeper.length > 0) {
        const sleeperDataForEmail = train.Sleeper.filter(sleeper => sleeper.email === providedEmail);
        return sleeperDataForEmail; // Return the found data
      } else {
        return null; // Return null if no data is found
      }
    } catch (err) {
      console.error(err);
      return null; // Return null in case of an error
    }
  }

  try {
    const sleeperDataForEmail = await findSleeperData(trainNo, email);
    
      ticketData = sleeperDataForEmail;
       function constructEmailBody(data) {
        let emailBody = '<h1>Confirm Ticket Details</h1>';
        data.forEach(ticket => {
          emailBody += `
            <p>Name: ${ticket.Pname}</p>
            <p>Age: ${ticket.Age}</p>
            <p>Gender: ${ticket.Gender}</p>
            <p>OTP: ${ticket.System_otp}</p>
            <p>Seat No: ${ticket.Seat_No}</p>
            <p>Coach No: ${ticket.Coach}</p>
            <p>Class: ${ticket.Class}</p>
            <hr>`;
        });
        return emailBody;
      }
      
      // Create a transporter using SMTP
   const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'deven.jacobson86@ethereal.email',
        pass: 'KJnH8qcgWURjpmVVSs'
    }
});
      
      // Email construction
      async function sendEmail() {
        try {
          const mailOptions = { 
            from: '"SeatSync" <seatsync@gmail.com>',
            to: 'ankit092001@gmail.com',
            subject: 'Confirm Ticket',
            html: constructEmailBody(ticketData),
          };
      
          const info = await transporter.sendMail(mailOptions);
          console.log('Email sent: ' + info.response);
        } catch (error) {
          console.error('Error occurred:', error);
        }
      }
      
      sendEmail();
    
  } catch (err) {
    console.error(err);
  }
}
if(Class==="ac"){
  async function findACData(providedTrainNo, providedEmail) {
    try {
      const train = await Train.findOne({ trainNo: providedTrainNo }).populate({
        path: 'AC',
        match: { email: providedEmail },
      });
  
      if (train && train.AC && train.AC.length > 0) {
        const acDataForEmail = train.AC.filter(ac => ac.email === providedEmail);
        return acDataForEmail; // Return the found data
      } else {
        return null; // Return null if no data is found
      }
    } catch (err) {
      console.error(err);
      return null; // Return null in case of an error
    }
  }

  try {
    const acDataForEmail = await findACData(trainNo, email);
    
      ticketData = acDataForEmail;
       function constructEmailBody(data) {
        let emailBody = '<h1>Confirm Ticket Details</h1>';
        data.forEach(ticket => {
          emailBody += `
            <p>Name: ${ticket.Pname}</p>
            <p>Age: ${ticket.Age}</p>
            <p>Gender: ${ticket.Gender}</p>
            <p>OTP: ${ticket.System_otp}</p>
            <p>Seat No: ${ticket.Seat_No}</p>
            <p>Coach No: ${ticket.Coach}</p>
            <p>Class: ${ticket.Class}</p>
            <hr>`;
        });
        return emailBody;
      }
      
      // Create a transporter using SMTP
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'deven.jacobson86@ethereal.email',
            pass: 'KJnH8qcgWURjpmVVSs'
        }
    });
      
      // Email construction
      async function sendEmail() { 
        try {
          const mailOptions = {
            from: '"SeatSync" <seatsync@gmail.com>',
            to: 'ankit092001@gmail.com',
            subject: 'Confirm Ticket',
            html: constructEmailBody(ticketData),
          };
      
          const info = await transporter.sendMail(mailOptions);
          console.log('Email sent: ' + info.response);
        } catch (error) {
          console.error('Error occurred:', error);
        }
      }
      
      sendEmail();
     
  } catch (err) {
    console.error(err);
  }
}
console.log(ticketData)



});

// Router to get train route
router.get("/train-route/:trainNo", async (req, res, next) => {
  const trainNumber = "12345";
  async function getRouteData(trainNumber) {
    const train = await Train.findOne({ trainNo: trainNumber }).select("route");

    if (!train) {
      console.log("Train not found");
    }
    console.log(train.route);
  }
  getRouteData(trainNumber);
});

// Router to Search Route
router.post("/searchRoute", async (req, res, next) => {
  let possibleRoute = [];
  // console.log(req.body.source)
  async function searchAllRoute() {
    const source = req.body.source;
    const destination = req.body.destination;

    const allTrainData = await Train.find();
    for await (let trainData of allTrainData) {
      let sourceobj = null;
      let destinationobj = null;

      for await (let routeData of trainData.route) {
        if (source === routeData.stationName) {
          sourceobj = routeData;
        }
        if (destination === routeData.stationName) {
          destinationobj = routeData;
        }
      }
      if (!sourceobj) {
      } else if (!destinationobj) {
      } else if (sourceobj.srNo < destinationobj.srNo) {
        let resultObj = {
          trainNo: trainData.trainNo,
          trainName: trainData.trainName,
          sourceNo: sourceobj.srNo,
          destinationNo: destinationobj.srNo,
          startTime: sourceobj.station_time,
          endTime: destinationobj.station_time,
          distance: destinationobj.distance - sourceobj.distance,
          SleeperSeat: trainData.S_Seat_Available,
          ACSeat: trainData.A_Seat_Available,
        };
        possibleRoute.push(resultObj);
      } else {
      }
    }
    res.send(possibleRoute);
    console.log(possibleRoute);
  }
  searchAllRoute();
});




router.post("/alternateRoute", async (req, res, next) => { 
    let sourcNo = 0
    let destinationNo = 1000
    

    


    let possibleRoute = [];
  async function searchRoute() {
    const source = req.body.searchData.source;
    const destination = req.body.searchData.destination;
    const trainNo = req.body.searchData.trainNo

    const allTrainData = await Train.find({ trainNo: trainNo });
    for await (let trainData of allTrainData) {
      let sourceobj = null;
      let destinationobj = null;

      for await (let routeData of trainData.route) {
        if (source === routeData.stationName) {
          sourceobj = routeData;
        }
        if (destination === routeData.stationName) {
          destinationobj = routeData;
        }
      }
      if (!sourceobj) {
        res.send(possibleRoute)
      } else if (!destinationobj) {
        res.send(possibleRoute)
      } else if (sourceobj.srNo < destinationobj.srNo) {
       
        sourcNo = sourceobj.srNo
        destinationNo = destinationobj.srNo
        const classType = req.body.searchData.classType

        if(classType === "sleeper"){
          
          // For maximum Source no
         await Train.aggregate([
            { $unwind: "$Sleeper" },
            {
              $sort: {
                "Sleeper.Start_No": -1,
                
              },
            },
            {
              $group: {
                _id: null,
                maxSourceNo: { $first: "$Sleeper.Start_No" },
                sourceStation : {$first: "$Sleeper.Source"},
                destinationStation : {$first: "$Sleeper.Destination"},
                Seat_No: { $first: "$Sleeper.Seat_No" },
                Coach: { $first: "$Sleeper.Coach" },
              },
            },
          ])
            .exec()
            .then((result) => {
              if (result.length > 0) {
                const maxSourceNo = result[0].maxSourceNo;
                const sourceStation = result[0].sourceStation;
                const destinationStation = result[0].destinationStation;
                const seatNo = result[0].Seat_No;
                const coachNo = result[0].Coach;
                
                if(maxSourceNo === 0 || maxSourceNo === 1){

                }
                else{
                  let resultObj = {
                    seatNo: seatNo,
                    coachNo: coachNo,
                    trainNo: trainData.trainNo,
                    trainName: trainData.trainName,
                    sourceStation: source,
                    destinationStation: sourceStation,
                    destinationNo: maxSourceNo,  
                    sourceNo: sourceobj.srNo,
                    
                    startTime: sourceobj.station_time,
                    endTime: destinationobj.station_time,
                    SleeperSeat: 1,
                    ACSeat: 0
                  };
                  
                  possibleRoute.push(resultObj);
                  
                }
              } else {
                console.log("No Sleeper data found");
              }
            })
            .catch((err) => {
              console.error("Error:", err);
            });

            // For minimum destination No
           await Train.aggregate([
              { $unwind: "$Sleeper" },
              {
                $sort: {
                  "Sleeper.End_No": 1,
                  
                },
              },
              {
                $group: {
                  _id: null,
                  maxSourceNo: { $first: "$Sleeper.End_No" },
                  sourceStation : {$first: "$Sleeper.Source"},
                  destinationStation : {$first: "$Sleeper.Destination"},
                  Seat_No: { $first: "$Sleeper.Seat_No" },
                  Coach: { $first: "$Sleeper.Coach" },
                },
              },
            ])
              .exec()
              .then((result) => {
                if (result.length > 0) {
                  const maxSourceNo = result[0].maxSourceNo;
                  const sourceStation = result[0].sourceStation;
                  const destinationStation = result[0].destinationStation;
                  const seatNo = result[0].Seat_No;
                  const coachNo = result[0].Coach;
                  
                  if(maxSourceNo === 1000 || maxSourceNo === trainData.route.length){
  
                  }
                  else{

                    let resultObj = {
                      seatNo: seatNo,
                      coachNo: coachNo,
                      trainNo: trainData.trainNo,
                      
                      sourceStation: destinationStation,
                      destinationStation: destinationobj.stationName,
                      trainName: trainData.trainName,
                      sourceNo: maxSourceNo,
                      destinationNo: destinationobj.srNo,
                      startTime: sourceobj.station_time,
                      endTime: destinationobj.station_time,
                      SleeperSeat: 1, 
                      ACSeat: 0
                    };
                    possibleRoute.push(resultObj);
                    
                  }
                } else {
                  console.log("No Sleeper data found");
                }
              })
              .catch((err) => {
                console.error("Error:", err);
              });
        }
        console.log(possibleRoute)
        
        // for Ac
        if(classType === "ac"){
          
          // For maximum Source no
         await Train.aggregate([
            { $unwind: "$AC" },
            {
              $sort: {
                "AC.Start_No": -1,
                
              },
            },
            {
              $group: {
                _id: null,
                maxSourceNo: { $first: "$AC.Start_No" },
                sourceStation : {$first: "$AC.Source"},
                destinationStation : {$first: "$AC.Destination"},
                Seat_No: { $first: "$AC.Seat_No" },
                Coach: { $first: "$AC.Coach" },
              },
            },
          ])
            .exec()
            .then((result) => {
              if (result.length > 0) {
                const maxSourceNo = result[0].maxSourceNo;
                const sourceStation = result[0].sourceStation;
                const destinationStation = result[0].destinationStation;
                const seatNo = result[0].Seat_No;
                const coachNo = result[0].Coach;
                
                if(maxSourceNo === 0 || maxSourceNo === 1){

                }
                else{
                  let resultObj = {
                    seatNo: seatNo,
                    coachNo: coachNo,
                    trainNo: trainData.trainNo,
                    trainName: trainData.trainName,
                    sourceStation: source,
                    destinationStation: sourceStation,
                    destinationNo: maxSourceNo,  
                    sourceNo: sourceobj.srNo,
                    
                    startTime: sourceobj.station_time,
                    endTime: destinationobj.station_time,
                    SleeperSeat: 0, 
                    ACSeat: 1
                  };
                  
                  possibleRoute.push(resultObj);
                  
                }
              } else {
                console.log("No Sleeper data found");
              }
            })
            .catch((err) => {
              console.error("Error:", err);
            });

            // For minimum destination No
           await Train.aggregate([
              { $unwind: "$AC" },
              {
                $sort: {
                  "AC.End_No": 1,
                  
                },
              },
              {
                $group: {
                  _id: null,
                  maxSourceNo: { $first: "$AC.End_No" },
                  sourceStation : {$first: "$AC.Source"},
                  destinationStation : {$first: "$AC.Destination"},
                  Seat_No: { $first: "$AC.Seat_No" },
                  Coach: { $first: "$AC.Coach" },
                },
              },
            ])
              .exec()
              .then((result) => {
                if (result.length > 0) {
                  const maxSourceNo = result[0].maxSourceNo;
                  const sourceStation = result[0].sourceStation;
                  const destinationStation = result[0].destinationStation;
                  const seatNo = result[0].Seat_No;
                  const coachNo = result[0].Coach;
                  
                  if(maxSourceNo === 1000 || maxSourceNo === trainData.route.length){
  
                  }
                  else{

                    let resultObj = {
                      seatNo: seatNo,
                      coachNo: coachNo,
                      trainNo: trainData.trainNo,
                      
                      sourceStation: destinationStation,
                      destinationStation: destinationobj.stationName,
                      trainName: trainData.trainName,
                      sourceNo: maxSourceNo,
                      destinationNo: destinationobj.srNo,
                      startTime: sourceobj.station_time,
                      endTime: destinationobj.station_time,
                      SleeperSeat: 0,
                      ACSeat: 1 
                    };
                    possibleRoute.push(resultObj);
                    
                  }
                } else {
                  console.log("No Sleeper data found");
                }
              })
              .catch((err) => {
                console.error("Error:", err);
              });
        }
   
        console.log(possibleRoute)
        for await (let routes of possibleRoute){
          const trainNo = req.body.searchData.trainNo
          const srNo = routes.sourceNo
          await Train.aggregate([
            { $match: { trainNo: trainNo } }, // Match the train number
            { $unwind: "$route" }, // Unwind the route array
            { $match: { "route.srNo": srNo } }, // Match the srNo within the route array
            {
              $project: {
                _id: 0,
                station_time: "$route.station_time", // Project the station_time field
              },
            },
          ])
            .then((result) => {
              if (result.length > 0) {
                const stationTime = result[0].station_time;
                routes.startTime = stationTime
                console.log("Station Time:", stationTime);
              } else {
                console.log("No matching station found for srNo:", srNo);
              }
            })
            .catch((err) => {
              console.error("Error:", err);
            });
        }

        for await (let routes of possibleRoute){
          const trainNo = req.body.searchData.trainNo
          const srNo = routes.destinationNo
          await Train.aggregate([
            { $match: { trainNo: trainNo } }, // Match the train number
            { $unwind: "$route" }, // Unwind the route array
            { $match: { "route.srNo": srNo } }, // Match the srNo within the route array
            {
              $project: {
                _id: 0,
                station_time: "$route.station_time", // Project the station_time field
              },
            },
          ])
            .then((result) => {
              if (result.length > 0) {
                const stationTime = result[0].station_time;
                routes.endTime = stationTime
                console.log("Station Time:", stationTime);
              } else {
                console.log("No matching station found for srNo:", srNo);
              }
            })
            .catch((err) => {
              console.error("Error:", err);
            });
        }

        res.send(possibleRoute);
        
      } else {
        res.send(possibleRoute)
      }
    }

  
    
    
    // console.log(possibleRoute);
  }
  await searchRoute();

  

});



router.post("/alternate-S-passenger", async (req, res, next) => {
  console.log(req.body.trainAllData);
  let email = req.body.trainAllData.email
  const min = 1000;
  const max = 9999;
  // Generate a random number between min and max (inclusive)
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const trainNo = req.body.trainAllData.trainNo
  const sourceNo = req.body.trainAllData.data.sourceNo
  const endNo = req.body.trainAllData.data.destinationNo
  const sourceStation = req.body.trainAllData.data.sourceStation
  const destinationStation = req.body.trainAllData.data.destinationStation
  const Class = req.body.trainAllData.classType
  
 
  const updateStartEndNoSleeper = async (trainNo, seatNo, coachNo, sourceNo, destinationNo) => {
    try {
      // Update Start_No if sourceNo is less than the current Start_No for the given seatNo and coachNo
      const startUpdate = await Train.updateOne(
        {
          trainNo: trainNo,
          "Sleeper.Seat_No": seatNo,
          "Sleeper.Coach": coachNo,
          "Sleeper.Start_No": { $gt: sourceNo } // Find documents where Start_No is greater than sourceNo
        },
        { $set: { "Sleeper.$.Start_No": sourceNo } } // Set Start_No to sourceNo
      );
  
      // Update End_No if destinationNo is greater than the current End_No for the given seatNo and coachNo
      const endUpdate = await Train.updateOne(
        {
          trainNo: trainNo,
          "Sleeper.Seat_No": seatNo,
          "Sleeper.Coach": coachNo,
          "Sleeper.End_No": { $lt: destinationNo } // Find documents where End_No is less than destinationNo
        },
        { $set: { "Sleeper.$.End_No": destinationNo } } // Set End_No to destinationNo
      );
  
      return { startUpdate, endUpdate };
    } catch (error) {
      // Handle errors
      console.error("Error updating Start_No and End_No:", error);
      throw error;
    }
  };

  const updateStartEndNoAC = async (trainNo, seatNo, coachNo, sourceNo, destinationNo) => {
    try {
      // Update Start_No if sourceNo is less than the current Start_No for the given seatNo and coachNo
      const startUpdate = await Train.updateOne(
        {
          trainNo: trainNo,
          "AC.Seat_No": seatNo,
          "AC.Coach": coachNo,
          "AC.Start_No": { $gt: sourceNo } // Find documents where Start_No is greater than sourceNo
        },
        { $set: { "AC.$.Start_No": sourceNo } } // Set Start_No to sourceNo
      );
  
      // Update End_No if destinationNo is greater than the current End_No for the given seatNo and coachNo
      const endUpdate = await Train.updateOne(
        {
          trainNo: trainNo,
          "AC.Seat_No": seatNo,
          "AC.Coach": coachNo,
          "AC.End_No": { $lt: destinationNo } // Find documents where End_No is less than destinationNo
        },
        { $set: { "AC.$.End_No": destinationNo } } // Set End_No to destinationNo
      );
  
      return { startUpdate, endUpdate };
    } catch (error) {
      // Handle errors
      console.error("Error updating Start_No and End_No:", error);
      throw error;
    }
  };
  
 
  

   const seatNo = req.body.trainAllData.data.seatNo
        const coachNo = req.body.trainAllData.data.coachNo
       await updateStartEndNoSleeper(trainNo,seatNo,coachNo,sourceNo,endNo)

  const addMinutesToTime = (timeString,minutesToAdd)=>{
      const format = 'h:mm A';
      const initialTime = moment(timeString,format)
      const newTime = initialTime.add(minutesToAdd,'minutes');
      return newTime.format(format)
  }
  const startTime = req.body.trainAllData.data.startTime
  const deadlineTime = addMinutesToTime(startTime,30)
  const passengerData = req.body.passengerData
  res.status(200).json("ok");


  // Update the Train document with additional Sleeper data
  async function addSleeperDataToTrain(trainNo, additionalData) {
    try {
      // updateSeatValue(12345)
      const trainData = await Train.findOne({ trainNo: trainNo });
      

      const updatedTrain = await Train.findOneAndUpdate(
        { trainNo: trainNo },
        { $push: { Sleeper: { $each: additionalData } } },
        { new: true }
      );
      console.log("Updated Train:", updatedTrain);
     
    } catch (error) {
      console.error("Error updating Train:", error);
    }
  }


  async function addACDataToTrain(trainNo, additionalData) {
    try {
      // updateSeatValue(12345)
      const trainData = await Train.findOne({ trainNo: trainNo });

      const updatedTrain = await Train.findOneAndUpdate(
        { trainNo: trainNo },
        { $push: { AC: { $each: additionalData } } },
        { new: true }
      );
      console.log("Updated Train:", updatedTrain);
     
    } catch (error) {
      console.error("Error updating Train:", error);
    }
  }


  // Call the function to add the new Sleeper data to the Train
async function addData(){
  for await (let passenger of passengerData ){
  const additionalSleeperData = [
    {
      Class:Class,
      Coach: req.body.trainAllData.data.coachNo,
      Seat_No: req.body.trainAllData.data.seatNo,
      Pname: passenger.name,
      Gender: passenger.gender,
      Age: passenger.age,
      email: email,
      System_otp: randomNumber,
      Start_No: sourceNo,
      End_No: endNo,
      Source: sourceStation,
      Destination: destinationStation,
      Deadline: deadlineTime
    },
     
    // Add more Sleeper data if needed
  ];
  
    if(Class==="sleeper"){
      
     await addSleeperDataToTrain(trainNo, additionalSleeperData);
    }
    if(Class === "ac"){
      await addACDataToTrain(trainNo, additionalSleeperData);
    }
  // console.log(additionalSleeperData)
      return additionalSleeperData
  // code to send mail of tickets


}

}
let ticketData=[]







if(Class==="sleeper"){
  async function findSleeperData(providedTrainNo, providedEmail) {
    try {
      const train = await Train.findOne({ trainNo: providedTrainNo }).populate({
        path: 'Sleeper',
        match: { email: providedEmail },
      });
  
      if (train && train.Sleeper && train.Sleeper.length > 0) {
        const sleeperDataForEmail = train.Sleeper.filter(sleeper => sleeper.email === providedEmail);
        return sleeperDataForEmail; // Return the found data
      } else {
        return null; // Return null if no data is found
      }
    } catch (err) {
      console.error(err);
      return null; // Return null in case of an error
    }
  }

  try {
    const sleeperDataForEmail = await findSleeperData(trainNo, email);
    
    
       function constructEmailBody(data) {
        console.log("HIIIII")
        console.log(data)
        let emailBody = '<h1>Confirm Ticket Details</h1>';
        data.forEach(ticket => {
          emailBody += `
            <p>Name: ${ticket.Pname}</p>
            <p>Age: ${ticket.Age}</p>
            <p>Gender: ${ticket.Gender}</p>
            <p>OTP: ${ticket.System_otp}</p>
            <p>Seat No: ${ticket.Seat_No}</p>
            <p>Coach No: ${ticket.Coach}</p>
            <p>Class: ${ticket.Class}</p>
            <hr>`;
        });
        return emailBody;
      }
      
      // Create a transporter using SMTP
   const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'deven.jacobson86@ethereal.email',
        pass: 'KJnH8qcgWURjpmVVSs'
    }
});
      
      // Email construction
      async function sendEmail() {
        const additionalSleeperData = await addData()
        
    console.log(additionalSleeperData)
    ticketData.push(additionalSleeperData)
        try {
          const mailOptions = { 
            from: '"SeatSync" <seatsync@gmail.com>',
            to: 'ankit092001@gmail.com',
            subject: 'Confirm Ticket',
            html: constructEmailBody(additionalSleeperData),
          };
      
          const info = await transporter.sendMail(mailOptions);
          console.log('Email sent: ' + info.response);
        } catch (error) {
          console.error('Error occurred:', error);
        }
      }
      
      // sendEmail();
    
  } catch (err) {
    console.error(err);
  }
}
if(Class==="ac"){
  async function findACData(providedTrainNo, providedEmail) {
    try {
      const train = await Train.findOne({ trainNo: providedTrainNo }).populate({
        path: 'AC',
        match: { email: providedEmail },
      });
  
      if (train && train.AC && train.AC.length > 0) {
        const acDataForEmail = train.AC.filter(ac => ac.email === providedEmail);
        return acDataForEmail; // Return the found data
      } else {
        return null; // Return null if no data is found
      }
    } catch (err) {
      console.error(err);
      return null; // Return null in case of an error
    }
  }

  try {
    const acDataForEmail = await findACData(trainNo, email);
    
    const additionalSleeperData = await addData()
    console.log(additionalSleeperData)
    ticketData.push(additionalSleeperData)
       function constructEmailBody(data) {
        
        let emailBody = '<h1>Confirm Ticket Details</h1>';
        data.forEach(ticket => {
          emailBody += `
            <p>Name: ${ticket.Pname}</p>
            <p>Age: ${ticket.Age}</p>
            <p>Gender: ${ticket.Gender}</p>
            <p>OTP: ${ticket.System_otp}</p>
            <p>Seat No: ${ticket.Seat_No}</p>
            <p>Coach No: ${ticket.Coach}</p>
            <p>Class: ${ticket.Class}</p>
            <hr>`;
        });
        return emailBody;
      }
      
      // Create a transporter using SMTP
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'deven.jacobson86@ethereal.email',
            pass: 'KJnH8qcgWURjpmVVSs'
        }
    });
      
      // Email construction
      async function sendEmail() { 
        const additionalSleeperData = await addData()
        try {
          const mailOptions = {
            from: '"SeatSync" <seatsync@gmail.com>',
            to: 'ankit092001@gmail.com',
            subject: 'Confirm Ticket',
            html: constructEmailBody(additionalSleeperData),
          };
      
          const info = await transporter.sendMail(mailOptions);
          console.log('Email sent: ' + info.response);
        } catch (error) {
          console.error('Error occurred:', error);
        }
      }
      
      sendEmail();
     
  } catch (err) {
    console.error(err);
  }
}
console.log(ticketData)



});


module.exports = router;
