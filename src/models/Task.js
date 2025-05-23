const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    date: Date,
    creationDate: Date,
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
  });
  
  const Task = mongoose.model('Task', taskSchema);
  module.exports = Task;