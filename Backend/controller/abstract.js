const user = require("../models/User");
const event = require("../models/Event");
const fil = require("../models/File");
const abstract = require("../models/Abstract");
const moment = require("moment");
const fs = require("fs");

exports.abs_submit = async (req, res) => {
    let {title,description,sub_comment,sub_date} = req.body;
    
    // if (!title) {
    //   res.status(400).send({
    //     message: "first name can not be empty!"
    //   });
    //   return;
    // }
    // if (!description) {
    //   res.status(400).send({
    //     message: "last name can not be empty!"
    //   });
    //   return;
    // }
    // if (!sub_comment) {
    //   res.status(400).send({
    //     message: "email can not be empty!"
    //   });
    //   return;
    // }
    // if (!sub_date) {
    //     res.status(400).send({
    //       message: "email can not be empty!"
    //     });
    //     return;
    //   }

    const eid = req.params.id;
    if (!eid) {
      res.status(400).send({
        message: "Event id is empty!"
      });
      return;
    }
    
     const abst = await abstract.create({
      title: title,
      description :description,
      submission_comment : sub_comment,
      submitted_date : sub_date,
      eid: eid
    });
    const fl =req.files.file;
    const filepath = `../SubmittedAbs/${fl.name}`
    await fl.mv(filepath)
    fil.create({
      filename: fl.name,
      content_type: 'application/pdf',
      size: fl.size,
      mimetype: fl.mimetype,
      md5: fl.md5,
      storage_file_path: filepath,
      abs_id:abst.absid
    })
    .then(
      res.send({message : "File uploaded"})
    )
};