//access the orm functions to query the database
var orm = require("../config/orm.js");

var burger = {
  select: function(cb) {
    orm.selectAll("burgers", function(res) {
      cb(res);
    });
  },
  // 
  create: function(cols, vals, cb) {
    orm.insertOne("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.updateOne("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;
