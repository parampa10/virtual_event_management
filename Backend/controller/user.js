const user = require("../models/User");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")

exports.user_signup =async  (req, res) => {
            let {first_name,last_name,dob,address_line1,city,state,country,primary_phone_number,primary_email_address,affiliation_name,affiliation_email_address,username,password,is_admin,is_attendee,is_presenter}=req.body;
            if (!first_name) {
              res.status(400).send({
                message: "First name can not be empty!"
              });
              return;
            }
            if (!last_name) {
              res.status(400).send({
                message: "Last name can not be empty!"
              });
              return;
            }
            if (!primary_email_address) {
              res.status(400).send({
                message: "Email can not be empty!"
              });
              return;
            }
            if (!password) {
              res.status(400).send({
                message: "Password can not be empty!"
              });
              return;
            }
            let hash= await bcrypt.hash(password,10);
            user.create({
                fname:first_name,
                lname:last_name,
                dob:dob,
                address:address_line1,
                city:city,
                state:state,
                country:country,
                phone_no: primary_phone_number,
                email:primary_email_address,
                affiliation:affiliation_name,
                aff_email:affiliation_email_address,
                username:username,
                password:hash,
                is_admin:is_admin,
                is_attendee:is_attendee,
                is_presenter:is_presenter,
              })
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
            }

exports.user_login = (req, res, next) => {
  if (!req.body.username) {
    res.status(400).send({
      message: "Please enter the email!"
    });
    return;
  }
  user.findOne({ 
    // where: {email: req.body.username} 
    $or:[
      {email:req.body.username},
      {username:req.body.username}
    ]
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Not found"
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              id:user.id,
              is_admin:user.is_admin,
              is_attendee:user.is_attendee,
              is_presenter:user.is_presenter,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          // res.header("auth-token", token).send({
          //   token,
          //   email: req.body.email,  
          //   id: user.id,
          // });   
          // res.headers.set("auth",token);
          res.cookie('jwt',token, { httpOnly: true, secure: true, maxAge: 3600000 });
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Went wrong"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.all_user =(req,res) =>{
    try{
      user.findAll()
      .then(data =>{
        res.send(data);
      })
    }catch(err){
        res.status(500).json({err:err.message});
    }
};

exports.delete_user = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({
      message: "ID can not be empty!"
    });
    return;
  }
  user.destroy({
    where: { uid: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

exports.user_by_id =(req,res) =>{
  if (!req.params.id) {
    res.status(400).send({
      message: "ID can not be empty!"
    });
    return;
  }
  try{
    user.findOne({ where: {uid: req.params.id} })
     .then(data=>{
      if (data != null) {
        res.send(data);
      }
      else{
        return res.status(401).json({
          message: `User not found with id=${req.params.id}`
        });
      }
    });
  }catch(err){
      res.status(500).json({err:err.message});
  }
};

exports.user_by_fname =(req,res,next) =>{
  try{
    let name =req.body.fname;
    if(name==null){
      next()
    }
    else{
    user.findOne({ where: {fname: name} })
    .then(data => {
      if (data == null) {
        return res.status(401).json({
          message: `User not found with fname=${name} `
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
};

exports.user_by_email =(req,res,next) =>{
  try{
    let mail=req.body.email;
    if(mail == null)
    {
      next()
    }
    else{
    user.findOne({ where: {email: mail} })
    .then(data => {
      if (data == null) {
        return res.status(401).json({
          message: `User not found with email=${mail}`
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
};

exports.user_by_lname =(req,res,next) =>{
  try{
    let name=req.body.lname;
    if(name == null)
    {
      next()
    }
    else{
    user.findOne({ where: {lname: name} })
    .then(data => {
      if (data == null) {
        return res.status(401).json({
          message: `User not found with lname=${name}`
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
};