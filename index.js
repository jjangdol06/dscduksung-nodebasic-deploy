const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session= require('express-session');
const cors = require('cors');
const logger = require('./logger');
const helmet = require('helmet');
const hpp = require('hpp');
require('dotenv').config();


const { sequelize } = require('./models');
const pageRouter = require('./routes/page');

const app = express();
app.use(cors());
sequelize.sync();

app.set('port', process.env.PORT || 3065)

if ( process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(helmet());
    app.use(hpp());
} else {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', pageRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    logger.info('hello');
    logger.error(err.message);
    next(err);
})

app.use((err, req, res) =>{
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') ==='development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
})

app.listen(app.get('port'), () => {
    console.log('server is running on http://localhost:', app.get('port'));
});