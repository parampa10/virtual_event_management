const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
  uid:{
    type: Sequelize.INTEGER,
    autoIncrement : true,
    primaryKey:true
  },
  fname:{
    type: Sequelize.STRING
  },
  lname:{
    type: Sequelize.STRING
  },
  dob:{
    type: Sequelize.DATEONLY
  },
  address:{
    type: Sequelize.STRING
  },
  city:{
    type: Sequelize.STRING
  },
  state:{
    type: Sequelize.STRING
  },
  country:{
    type: Sequelize.STRING
  },
  phone_no:{
    type: Sequelize.BIGINT
  },
  email: {
    type: Sequelize.STRING
  },
  affiliation:{
    type: Sequelize.STRING
  },
  aff_email:{
    type: Sequelize.STRING
  },
  username:{
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  is_admin:{
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  is_attendee:{
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  is_presenter:{
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});


User.sync().then(() => {
    console.log('table created');
  });

module.exports = User;