const express = require('express');
const usersRouter = require('./routes/users');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json());

app.use('/api/v1/', usersRouter);


module.exports = app;
