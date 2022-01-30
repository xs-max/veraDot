const path = require('path');
const express = require('express');
const morgan = require('morgan');
const pug = require('pug');
const cookieParser = require('cookie-parser');
const sessions = require("express-session");



const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const viewsRoute = require('./routes/viewsRoute');
const userRoute = require('./routes/userRoutes');
const vehicleRoute = require("./routes/vehicleRoutes");
const paymentRoute = require("./routes/paymentRoutes");
const complaintRoute = require("./routes/complaintRoute");


// start express app
const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,`public`)));



//3rd party middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}




// app.use(express.static(`${__dirname}/public`));

const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({extended: true, limit: '10kb'}));
app.use(cookieParser());




app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.cookies);
    next();
})


// Routes
app.use("/api/users", userRoute);
app.use("/api/vehicles", vehicleRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/complaints", complaintRoute);
app.use('/', viewsRoute);



app.all('*', (req, res, next) => {

    // const err = new Error(`Can't find ${req.originalUrl} on this server`);
    // err.statusCode = 404;
    // err.status = 'fail';
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));

});

app.use(globalErrorHandler);

module.exports = app;
