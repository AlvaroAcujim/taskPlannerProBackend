const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
},
  password: { 
    type: String, 
    required: true 
},
  email:{
    type: String, 
    required: true,
    unique: true
},
  role: { 
    type: String, 
    enum: ['admin', 'user'], 
    default: 'user' 
},
  image:{
    type: String,
    default: 'defaultUser.png'
  },
  tasks: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task' 
}],
  events: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Event' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;