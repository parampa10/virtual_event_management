const booth_info = require("../models/BoothInfo");

exports.booth_create = async(req , res) => {
    let{company_name,company_video,company_email,company_brochure,is_available_for_one_on_one,company_meet} = req.body;
    if (is_available_for_one_on_one && company_meet == null) {
        res.status(400).send({
          message: "Please provide a meet link"
        });
        return;
      }

      booth_info.create({
        company_name:company_name,
        company_video:company_video,
        company_email:company_email,
        company_brochure:company_brochure,
        is_available_for_one_on_one:is_available_for_one_on_one,
        company_meet:company_meet,
      }).then(result => {
        console.log(result);
        res.status(201).json({
          message: "Booth created"
        });
      }).catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}

exports.booth_get = async(req,res) => {
  booth_info.getAll((err,booths) => {
    if(err){
      res.status(500).json({
        error : err
      })
    }
    else if(booths){
      res.status(201).json({
        data: booths
      })
    }
    else{
      res.status(400).json({
        message: "No Data found"
      })
    }
  })
}

exports.booth_get_by_name = async(req,res) => {
  try{
    let name=req.body.name;
    if(name == null)
    {
      next()
    }
    else{
    booth_info.findOne({ where: {company_name: name} })
    .then(data => {
      if (data == null) {
        return res.status(401).json({
          message: `User not found with Name=${name}`
        });
      }
      else{
        res.send(data);
      }
    })
  }
  }catch(err){
      res.status(500).json({err:err.message});
  }
}

exports.booth_get_by_id = async(req,res) => {
  try{
    let id=req.body.id;
    if(id == null)
    {
      next()
    }
    else{
    booth_info.findOne({ where: {boothid: id} })
    .then(data => {
      if (data == null) {
        return res.status(401).json({
          message: `User not found with ID=${id}`
        });
      }
      else{
        res.send(data);
      }
    })
  }
  }catch(err){
      res.status(500).json({err:err.message});
  }
}

exports.booth_update = async(req,res) => {
  let{boothid,company_name,company_video,company_email,company_brochure,is_available_for_one_on_one,company_meet} = req.body;
  let a = booth_info(boothid,company_name,company_video,company_email,company_brochure,is_available_for_one_on_one,company_meet);
  booth_info.findOneAndUpdate({"boothid" : boothid}, a, {upsert:true}, function(err,data) {
    if (err) {
      return res.send(500, {error: err});
    }
    return res.send('Succesfully saved.');
  })
}

exports.booth_delete = async(req,res) => {
    let boothid = req.body.id;
    booth_info.deleteOne({"boothid": boothid}, function(err){
      if(err){
        return res.send(500, {error: err});
      }
      return res.send("Successfully Deleted");
    })
}