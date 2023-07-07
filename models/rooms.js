const mongoose = require('mongoose')

const roomsSchema = new mongoose.Schema({
    owner: {
        type:mongoose.Schema.Types.ObjectId,
         ref:'User'},
    title:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    photos: [String],
    roomPrice:{
        type:String,
        required: true
    },
    location:{
        type:String,
        required: true
    },
    beds:{
        type:Number,
        required: true
    },
    minOccupancy:{
        type:Number,
        required: true
    },
    maxOccupancy:{
        type:Number,
        required: true
    },
    setCheckIn:{
        type:String,
        required: true
    },
    setCheckout:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model("rooms", roomsSchema);