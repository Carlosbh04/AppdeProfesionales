const express = require('express');
const cors = require('cors');
const apiRouter = require('./routers/user.routers');
const errorHandler = require('./error/errorHandling');

const app = express();

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('API REST de profesionales');
});


app.use('/api', apiRouter);


app.use(errorHandler);

module.exports = app;
