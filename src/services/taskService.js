const Task = require("../models/Task");
const User = require("../models/User");

const createTask = async (data, userId) => {
  const { title, description, status, date } = data;
  const newTask = new Task({
    title,
    description,
    status,
    date,
    creationDate: new Date(),
    user: userId,
  });
  if (!title || !description || !status || !date) {
    throw new Error("Ningun campo puede estar vacio");
  }
  if (!userId) {
    throw new Error("El id del usuario no es valido");
  }

  await newTask.save();

  await User.findByIdAndUpdate(userId, {
    $push: { tasks: newTask._id },
  });
  return newTask;
};
const deleteTask = async (taskId, userId) => {
  const task = await Task.findByIdAndDelete({ _id: taskId });
  if (!task) throw new Error("Tarea no encontrada");
  await User.findByIdAndUpdate(userId, {
    $pull: { tasks: taskId },
  });
};
const updateTask = async (taskId, userId, data) => {
  const { title, description, status, date } = data;
  if (!title || !description || !status || !date)
    throw new Error("Rellene todos los campos");
  const task = await Task.findByIdAndUpdate(
    { _id: taskId, user: userId },
    { title, description, status, date },
    { new: true }
  );
  if (!task) throw new Error("Tarea no encontrada o autorizada");
  return task;
};
const getTasks = async (userId) => {
  return await Task.find({ user: userId });
};

module.exports = { createTask, deleteTask, updateTask, getTasks };
