var express = require("express");
var router = express.Router();


// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
//this route gets all of the burgers for display
router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

//route to create a new burger instance
router.post("/api/burgers", function (req, res) {
  burger.insertOne(["burger_name", "not_devoured"], [req.body.burger_name, req.body.devoured
  ], function (result) {
    // Send back the ID of the new burger
    res.json({ id: result.insertId });
  });
});

//route to change the burger not_devoured from true to fals
// router.put("/api/burgers/:id", function(req, res) {
//   var condition = "id = " + req.param.id;

router.put("/api/burgers", function (req, res) {
  var condition = "id = " + req.body.id;

  console.log("condition", condition);

  burger.updateOne(
    {
      not_devoured: req.body.not_devoured
    }, condition, function (result) {
      console.log("BurgCont " + result);
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    });
});

// Export routes for model/burger.js to use.
module.exports = router;
