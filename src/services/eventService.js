const Event = require("../models/Event");
const User = require("../models/User");

const createEvent = async (data, userId) => {
  const { title, description, date } = data;
  const newEvent = new Event({
    title,
    description,
    date,
    creationDate: new Date(),
    user: userId,
  });
  if (!title || !description || !date) {
    throw new Error("Ningun campo puede estar vacio");
  }
  if (!userId) {
    throw new Error("El id del usuario no es valido");
  }
  await newEvent.save();
  await User.findByIdAndUpdate(userId, {
    $push: { events: newEvent._id },
  });
  return newEvent;
};
const deleteEvent = async(userId, eventId) => {
    const event = await Event.findOneAndDelete({_id: eventId, user: userId});
    if(!event) throw new Error("Evento no encontrado");
    await User.findByIdAndUpdate(userId, {
        $pull: {events: eventId}
    });
};
const updateEvent = async (userId, eventId, data) => {
    const {title, description, date} = data;
    if(!title || !description || !date) throw new Error("Rellene todos los campos");
    const event = await Event.findOneAndUpdate(
        { _id: eventId, user: userId},
        {title, description, date},
        {new: true}
    );
    if(!event) throw new Error('Evento no encontrado');
    return event;
};
const getAllEvents = async() => {
    return await Event.find().populate('user', 'username');
}

module.exports = {createEvent, deleteEvent, updateEvent, getAllEvents};
