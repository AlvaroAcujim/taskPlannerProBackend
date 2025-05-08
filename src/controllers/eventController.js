const {createEvent, deleteEvent, updateEvent, getAllEvents} = require('../services/eventService');
const {} = require('../validations/eventValidation');
const eventController = {
    createEvent: [
        async(req,res) => {
            try{
                const userId = req.user.id;
                const event = await createEvent(req.body, userId);
                res.status(200).json(event);
            }catch(err){
                console.log('Error al crear event: ', err);
                res.status(500).json({error: 'Error al crear evento'})
            }
        }
    ],
    removeEvent:[
        async(req, res) => {
            try{
                const userId = req.user.id;
                const {eventId} = req.params;
                await deleteEvent(userId, eventId);
                res.status(200).json({message: 'Evento eliminado'});
            }catch(err){
                console.log('Error al eliminar evento: ', err);
                res.status(500).json({error: 'Error al eliminar evento'})
            }
        }
    ],
    updateEvent: [
        async(req, res) => {
            try{
                const userId = req.user.id;
                const {eventId} = req.params;
                const data = req.body;
                const updatedEvent = await updateEvent(userId, eventId, data);
                res.status(200).json({message: 'Evento actualizado con existo', updatedEvent});
            }catch(err){
                console.log('Error al actualizar evento', err);
                res.status(500).json({error: 'Error al actualizar'});
            }
        }
    ],
    getAllEvents: [
        async(req, res) => {
            try{
                const events = await getAllEvents();
                res.status(200).json(events);
            }catch(err){
                console.log('Error al obtener todos los eventos: ', err);
                res.status(500).json({message: 'Error al obtener los eventos'});
            }
        }
    ]
}
module.exports = eventController;