require('dotenv').config()
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

const app = express();
app.disable('x-powered-by');
cors({ credentials: true, origin: true });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
var options = {
  customCss: '.swagger-ui .topbar { display: none }'
};

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use('/', require('./server/index'));

module.exports = app;