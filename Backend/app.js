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

const checkAuth = require('./middleware/verifytoken');
const checkAdmin = require('./middleware/isAdmin');
const checkAttendee = require('./middleware/isAttendee');
const checkPresenter = require('./middleware/isPresenter');

const crypto = require('crypto')
const request = require("request");
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


app.post('/', (req, res) => {

  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(process.env.ZOOM_JWT_API_KEY + req.body.meetingNumber + timestamp + req.body.role).toString('base64')
  const hash = crypto.createHmac('sha256', process.env.ZOOM_JWT_API_SECRET).update(msg).digest('base64')
  const signature = Buffer.from(`${process.env.ZOOM_JWT_API_KEY}.${req.body.meetingNumber}.${timestamp}.${req.body.role}.${hash}`).toString('base64')

  res.json({
    signature: signature
  })
})

app.post("/createMeeting",checkAuth, checkAdmin,(req, res) => {
  const playload = req.body;
  const config ={
    token:"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InJHanJoUXRqVGxXZG9NMWVJYWhNa3ciLCJleHAiOjE3MzYwNTg2MDAsImlhdCI6MTY0MTM5MjE2Nn0.tS3gXPOMcHZX7zVvl_SLCg_bzTIjmqYJJ-kDhqehQ_c",
    email:"paramben10@gmail.com",
  }
  try {
    var options = {
      url: `https://api.zoom.us/v2/users/${config.email}/meetings`,
      method: "POST",
      auth: {
        bearer: config.token,
      },
      json: true,
      body: {
        start_time: playload.date,
        duration: playload.duration,
        topic: playload.topic,
        type: 2,
      },
    };
    request(options, (error, response, body) => {
      console.log(response.statusCode);
      
      if (!error && response.statusCode === 201) {
        res.send({ 
          message: "meeting has been successfully created ",
          link: response.body.join_url
        });
        console.log(response.body.join_url);
      } 
      else 
      {
        console.log(body);
        res.send({ message: body.message });
      }
    });
  } 
  catch (e) {
    res.status(500).send(e.toString());
  }
});

//app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports =app;