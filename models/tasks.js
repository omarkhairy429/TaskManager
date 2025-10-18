const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: [60, 'Task name should be 60 characters or less'],
      required: [true, "You must enter task's name"],
      trim: true 
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true } //  adds createdAt & updatedAt Automatically
);


const Task = mongoose.model('Task', taskSchema);
module.exports = Task;