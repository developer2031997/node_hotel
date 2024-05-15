const mongoose = require('mongoose');

const personSchema =  new mongoose.Schema({
name : {
    type : String,
    required : true
},age : {
    type : Number,
    required : true
},
work : {
    type : String,
        enum :['chef', 'waiter','manager'],
        required: true
},    mobile: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true
},
address: {
    type: String,
    required: true
},
salary: {
    type: Number,
    required: true
}
},{
    timestamps : true
})

const Person = mongoose.model('Person', personSchema);
module.exports = Person;