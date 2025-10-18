const Task = require('./../models/tasks');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

// Get All Tasks
exports.getTasks = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Task.find(), req.query)
    .filter()
    .sort()
    .limit()
    .paginate();
  const tasks = await features.query;

  res.status(200).json({
    status: 'success',
    results: tasks.length,
    data: { tasks }
  });
});

// Create a Task
exports.createTask = catchAsync(async (req, res, next) => {
  const task = await Task.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { task }
  });
});

// Get Task
exports.getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new AppError("Couldn't find a task with that id", 404));
  }

  res.status(200).json({
    status: 'success',
    data: { task }
  });
});

// Update Task
exports.updateTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!task) {
    return next(new AppError("Couldn't find a task with that id", 404));
  }

  res.status(200).json({
    status: 'success',
    data: { task }
  });
});

// Delete Task
exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    return next(new AppError("Couldn't find a task with that id", 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
