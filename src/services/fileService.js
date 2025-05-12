const fs = require("fs").promises;
const path = require("path");
const Event = require("../models/Event");
const User = require("../models/User");
const models = { user: User, event: Event };

const uploadDir = path.join(__dirname, "../uploads");
const eventDir = path.join(uploadDir, "events");
const userDir = path.join(uploadDir, "users");

const initializeUploadDir = async () => {
  try {
    await fs.access(uploadDir);
    await fs.access(eventDir);
    await fs.access(userDir);
  } catch (err) {
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.mkdir(eventDir, { recursive: true });
    await fs.mkdir(userDir, { recursive: true });
  }
};
const uploadFile = async (modelName, id, file) => {
  const Model = models[modelName];
  let imagePathFolder;
  if (!Model) throw new Error("Modelo no válido");

  const doc = await Model.findById(id).select('id username image');
  if (!doc) throw new Error("Documento no encontrado");

  if (modelName === "user") {
    imagePathFolder = userDir;
  } else if (modelName === "event") {
    imagePathFolder = eventDir;
  } else {
    throw new Error("Modelo no válido");
  }
  // Elimina imagen anterior
  if (doc.image) {
    const oldImagePath = path.join(imagePathFolder, doc.image);
    try {
      await fs.access(oldImagePath);
      await fs.unlink(oldImagePath);
    } catch (err) {
      if (err.code !== "ENOENT") throw err; // ignora si no existe
    }
  }

  // Guarda nueva imagen
  const ext = path.extname(file.originalname);
  const uniqueName = doc._id + ext;
  const newImagePath = path.join(imagePathFolder, uniqueName);
    await User.findByIdAndUpdate(
  id,                            // ID del usuario a actualizar
  { $set: { image: uniqueName } },  // Campos a actualizar
  { new: true }                      // Para devolver el documento actualizado
);
  await fs.writeFile(newImagePath, file.buffer);

 /*  doc.image = uniqueName;
  await doc.save(); */


  // Actualiza documento
  

  return doc;
};
const downloadFile = async (modelName, filename) => {
  let imagePathFolder;

  if (modelName === "user") {
    imagePathFolder = userDir;
  } else if (modelName === "event") {
    imagePathFolder = eventDir;
  } else {
    throw new Error("Modelo no válido");
  }

  const filePath = path.join(imagePathFolder, filename);

  try {
    await fs.access(filePath); // verifica existencia
    return filePath; // devuelve la ruta absoluta
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("Archivo no encontrado");
    } else {
      throw err;
    }
  }
};
initializeUploadDir();

module.exports = { uploadFile, downloadFile };
