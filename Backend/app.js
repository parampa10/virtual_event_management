const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database');
const morgan = require("morgan");
const dotenv=require('dotenv');
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload");
const cors=require('cors');
const path = require('path');
dotenv.config();



const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'SubmittedAbs'),
  createParentPath: true
}))

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))



const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');
const eventRegRoutes =require('./routes/e_register');
const absRoutes =require('./routes/abstracts');

app.use("/user", userRoutes);
app.use("/event",eventRoutes);
app.use("/events",eventRegRoutes);
app.use("/events",absRoutes);

app.get('/', (req, res) => res.send("Hello"));



//app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports =app;