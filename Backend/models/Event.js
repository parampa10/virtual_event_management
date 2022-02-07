const Sequelize = require('sequelize');
const { defaultValueSchemable } = require('sequelize/dist/lib/utils');
const db = require('../config/database');

const Event = db.define('event', {
  eid:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  title: {
    type: Sequelize.STRING
  },
  e_type: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  start_time: {
    type: Sequelize.TIME
  },
  end_time: {
    type: Sequelize.TIME
  },
  event_date: {
    type: Sequelize.DATEONLY
  },
  is_allocated:{
    type: Sequelize.BOOLEAN,
    defaultValue : false
  },
  address: {
    type: Sequelize.STRING
  },
  room_id: {
    type: Sequelize.INTEGER
  },
  room_name: {
    type: Sequelize.STRING
  },
  veneue_id: {
    type: Sequelize.INTEGER
  },
  veneue_id_2: {
    type: Sequelize.INTEGER
  }
});


Event.sync().then(() => {
    console.log('table created');
  });

module.exports = Event;