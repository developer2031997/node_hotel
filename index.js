const express = require('express');
const connectMongoDB = require('./connection');
// const adminRoutes= require("./routes/adminRoutes");
// const userRoutes= require("./routes/userRoutes");
const Person = require('./models/person.model');
const menuitem = require('./models/menuitem.model');
require('dotenv').config();

const PORT = process.env.PORT;
const MONGO_DB_URL = process.env.MONGO_DB_URL;


console.log("menuitem", menuitem)

const fs = require('fs');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


connectMongoDB(MONGO_DB_URL);

const logRequest = (req, res, next) => {
    const logmessage = `\n[${new Date().toLocaleString()}] Request Made to :  ${req.method} ${req.originalUrl}`;
    console.log(logmessage);
    fs.appendFile('request_logs.txt', logmessage, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        }
    });
    next(); // Move on to the next phase
};

app.use(logRequest);

app.get('/', (req,res)=>{
    res.send("welcome");
})
const personRouter = require("./routes/personRoute");
app.use('/person',personRouter);

const menuitemRoute = require("./routes/menuitemRoute");
app.use('/menuitem',menuitemRoute);

app.listen(PORT, ()=>{
    console.log(`server started at port :- ${PORT}`);
})

// app
// .post('/person',async (req,res)=>{
//  try {   const body = req.body;

//     // console.log('Request Body:', body);

//     const newPerson = await new Person(body);

//     const response = await newPerson.save();
//     console.log('data saved sucessfully !!!');
//     res.status(200).json(response);
// }
//     catch (error) {
//         console.log(error);
//         res.status(500).json({error : "Internal server error"})
// }
// }).get('/person', async (req, res) => {
//     try {
//         const result = await Person.find();
//         console.log(result);
//         res.status(200).json({ message: 'Fetch data successfully.', result: result });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// })
// .get('/person/:worktype',async (req,res)=>{
// try{
//     const worktype = req.params.worktype;
//     const result = await Person.find({work : worktype});
//     console.log(result);
//         res.status(200).json({ message: 'Fetch data successfully.', result: result });
// }
// catch(error){
//     console.log(error);
//         res.status(500).json({ error: "Internal server error" });
// }
// })


// app
// .post('/menu',async (req,res)=>{
//     try {
//         const body = req.body;
//         // console.log(body);

//         const newmenuitem = await new menuitem(body);

//          const response = await newmenuitem.save();
//          console.log('menuitem saved sucessfully !!!');
//          res.status(200).json(response);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({error : "Internal server error"})
//     }
// } )
// .get('/menu',async (req,res)=>{
//   try {
//     const result = await menuitem.find();
//     console.log(result);
//     res.status(200).json({ message: 'Fetch data successfully.', result: result });
//   } catch (error) { 
//     console.log(error);
//     res.status(500).json({error : "internal Server Error"})
//   }
// })