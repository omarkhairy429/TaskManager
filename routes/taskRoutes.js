const express = require('express');
const route = express.Router();
const taskController = require('./../controllers/taskController');


route.route('/')
     .get(taskController.getTasks)
     .post(taskController.createTask)



route.route('/:id')
      .get(taskController.getTask)
      .patch(taskController.updateTask)
      .delete(taskController.deleteTask)

     



module.exports = route;