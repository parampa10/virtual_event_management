const Sequelize = require('sequelize');
//const { defaultValueSchemable } = require('sequelize/dist/lib/utils');
const db = require('../config/database');

const Event = db.define('event', {
  eid:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  start: {
    type: Sequelize.TIME
  },
  end: {
    type: Sequelize.TIME
  },
  date: {
    type: Sequelize.DATEONLY
  },
  link:{
    type: Sequelize.STRING
  },
},{timestamps: false});


Event.sync().then(() => {
    console.log('table created');
  });

module.exports = Event;