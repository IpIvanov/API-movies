//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://newuser:newuser2211@ds343895.mlab.com:43895/heroku_bnt9bl0n';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;
