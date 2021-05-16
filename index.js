'use strict';
require('dotenv').config();
let server = require('./src/server');

server.start(process.env.PORT);



