const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();
mongoose.Promise = global.Promise;

const url = process.env.DATABASEURL;

mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`));