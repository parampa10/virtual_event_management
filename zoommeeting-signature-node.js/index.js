require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const cors = require('cors')

const request = require("request");

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json(), cors())
app.options('*', cors());

app.post('/', (req, res) => {

  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(process.env.ZOOM_JWT_API_KEY + req.body.meetingNumber + timestamp + req.body.role).toString('base64')
  const hash = crypto.createHmac('sha256', process.env.ZOOM_JWT_API_SECRET).update(msg).digest('base64')
  const signature = Buffer.from(`${process.env.ZOOM_JWT_API_KEY}.${req.body.meetingNumber}.${timestamp}.${req.body.role}.${hash}`).toString('base64')

  res.json({
    signature: signature
  })
})

//app.listen(port, () => console.log(`Zoom Web Meeting SDK Sample Signature Node.js on port ${port}!`))

//create meeting
//-----------------------------------------
app.use(cors());


app.use(bodyParser.json()); 

app.post("/create-meeting", (req, res) => {
  const playload = req.body;
  const config ={
    token:"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InJHanJoUXRqVGxXZG9NMWVJYWhNa3ciLCJleHAiOjE2NDA1OTUwMDQsImlhdCI6MTY0MDU4OTYwNX0.l5SWpt9FJFWFHgQ_nUrpiJiwql71miVvGvw9MmS25yY",
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
        res.send({ message: "meeting has been successfully created " });
      } else {
        console.log(body);
        res.send({ message: body.message });
      }
    });
  } 
  catch (e) {
    res.status(500).send(e.toString());
  }
  res.send('Hello World!')
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);