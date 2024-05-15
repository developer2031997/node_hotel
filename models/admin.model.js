const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name :{
        type : String,
        require:true
    },
    party:{
        type : String,
        require: true
    },
    age : {
        type :Number,
        required : true
    },
    votes :[
        {
          user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            require:true
          },
          votedAt : {
            type : Date,
            default : Date.now()
          }
            
        }
    ],
    voteCount :{
        type: Number,
        default: 0
    }
})

const Admin = mongoose.model('Admin', adminSchema);
module.exports= Admin;