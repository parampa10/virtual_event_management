const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('booth_info', {
  boothid:{
    type: Sequelize.INTEGER,
    autoIncrement : true,
    primaryKey:true
  },
  company_name:{
    type: Sequelize.STRING
  },
  company_video:{
      type: Sequelize.STRING
  },
  company_brochure:{
      type: Sequelize.STRING
  },
  company_email:{
      type: Sequelize.STRING
  },
  is_available_for_one_on_one:{
      type: Sequelize.BOOLEAN,
      defaultValue: false,
  },
  company_meet:{
      type: Sequelize.STRING,
  }
});

User.sync().then(() => {
    console.log('table created');
  });

module.exports = User;