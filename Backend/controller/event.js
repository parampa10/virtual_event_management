const event = require("../models/Event");

exports.event_by_day = async(req,res) => {
  // let current_date = Date()
  // const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
  var current_date = new Date(Date.now()).toLocaleString().split(',')[0]; // Foramt : MM/DD/YYYY
  try{
    event.findAll({ where: {date: current_date} })
    .then(data => {
      if (data == null) {
        return res.status(401).json({
          message: `No Events Today`
        });
      }
      else{
        res.send(data);
      }
    })
  }catch(err){
      res.status(500).json({err:err.message});
  }
}

exports.event_create =async  (req, res) => {
    let {name,type,description,start,end,date}=req.body;
    if (!name) {
      res.status(400).send({
        message: "name can not be empty!"
      });
      return;
    }
    if (!type) {
      res.status(400).send({
        message: "Event type can not be empty!"
      });
      return;
    }
    if (!description) {
      res.status(400).send({
        message: "Description can not be empty!"
      });
      return;
    }
    if (!start) {
      res.status(400).send({
        message: "Start time can not be empty!"
      });
      return;
    }
    if (!end) {
      res.status(400).send({
        message: "End time can not be empty!"
      });
      return;
    }
    if (!date) {
      res.status(400).send({
        message: "Event date can not be empty!"
      });
      return;
    }
    event.create({
        name:name,
        type:type,
        description:description,
        start:start,
        end:end,
        date:date,
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Event created"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
};

exports.event_update = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({
      message: "ID can not be empty!"
    });
    return;
  }

  event.update(req.body, {
    where: { eid: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Event with id=${id}. Maybe Event was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Event with id=" + id
      });
    });
};


exports.event_delete = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({
      message: "ID can not be empty!"
    });
    return;
  }
  event.destroy({
    where: { eid: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Event with id=${id}. Maybe Event was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Event with id=" + id
      });
    });
};

exports.event_by_id =(req,res) =>{
  if (!req.params.id) {
    res.status(400).send({
      message: "ID can not be empty!"
    });
    return;
  }
  try{
    event.findOne({ where: {eid: req.params.id} })
    .then(data =>{
      res.send(data);
    })
  }catch(err){
      res.status(500).json({err:err.message});
  }
};

exports.all_event =(req,res) =>{
  try{
    event.findAll()
    .then(data =>{
      res.send(data);
    })
  }catch(err){
      res.status(500).json({err:err.message});
  }
};