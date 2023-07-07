const express = require('express')
const mongoose = require('mongoose');
const app = express()
const cors = require('cors')
const uri = 'mongodb://localhost:27017/HotelClone';


// mongoose.connect('mongodb://localhost:27017/HotelClone', {
//      useNewURlParser: true,
//       useUnifiedTopology: true, 
// }, () => {
    
//     console.log('connected to database')
// }) 

mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000
  }).catch(err => console.log(err.reason));
  

const authRoutes = require("./routes/Auth");



app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api", authRoutes);



const PORT = 4000

app.listen(PORT,()=>{
console.log(`port is starting on ${PORT}`)
})