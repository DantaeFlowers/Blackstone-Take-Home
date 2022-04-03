var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const bookingsRouter = require ('./routes/booking')
const meetingRoomsRouter = require ('./routes/meetingRooms')

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/bookings', bookingsRouter)
app.use('/meetingRooms', meetingRoomsRouter)


module.exports = app;