const express = require('express');
const app = express();
// Requiring our Routes
const taskRouter = require('./routes/taskRoutes');
// Requiring Global Error Handler
const globalErrorHandler = require('./controllers/errorController');


// Middlewares
app.use(express.json());

// Routes
app.use('/tasks', taskRouter);


app.all('/{*any}', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


// ⚠️ Must be the last middleware
app.use(globalErrorHandler);



module.exports = app;