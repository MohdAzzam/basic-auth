'use strict';

// 3rd Party Resources
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./auth/user');
const notFoundHandler = require('./middleware/404');
const errorHandler = require('./middleware/500');
// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());
app.use(cors());
// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);

// Handlers -> Middlewares
app.use('*',notFoundHandler);
app.use(errorHandler);
function start(port) {
  app.listen(port, () => {
      console.log('Server Connect at PORT' + port)
      mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
      })
      .then(()=> console.log('conntected to mongoDB'))
      .catch((err)=> console.log(err));
  });

}

module.exports={
  app:app,
  start:start,
}