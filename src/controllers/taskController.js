const {createTask, deleteTask, updateTask, getTasks} = require('../services/taskService');
const {createTaskValidation, removeTaskValidation, updateTaskValidation} = require('../validations/taskValidations');

const taskController = {
    createTasks:[
        ...createTaskValidation,
        async(req, res) => {
            try{
                const userId = req.user.id;
                const task = await createTask(req.body, userId);
                res.status(200).json(task);
            }catch(err){
                console.log('Error al crear task: ', err);
                res.status(500).json({error: 'Error al crear task'})
            }
        },
    ],
    removeTask:[
        ...removeTaskValidation,
        async(req, res) => {
            try{
                const userId = req.user.id;
                const {taskId} = req.params;
                await deleteTask(taskId, userId);
                res.status(200).json({message: 'Tarea eliminada'});
            }catch(err){
                console.log('Error al eliminar la task: ', err);
                res.status(500).json({error: 'Error al eliminar task'})
            }
        }
    ],
    updateTasks:[
        ...updateTaskValidation,
        async(req,res) => {
            try{
            const userId = req.user.id;
            const {taskId} = req.params;
            const data = req.body;
            const updatedTask = await updateTask(taskId, userId, data);
            res.status(200).json({message:'Tarea actualizada con exito', updatedTask});
            }catch(err){
                console.log('Error al actualizar', err);
                res.status(500).json({error: 'Error al actualizar'})
            }
        }
    ],
    getTask: [
        async(req, res) => {
            try{
                const userId = req.user.id;
                const tasks = await getTasks(userId);
                res.status(200).json(tasks);
            }catch(err){
                console.log('Error al obtener las tasks', err);
                throw new Error('Error al obenter las tasks', err)
            }
        }
    ]


    
}
module.exports = taskController;