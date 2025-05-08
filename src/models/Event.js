const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    creationDate: Date,
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
  });
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;