// Import MySQL connection.
var connection = require("./connection.js");

// Helper function for SQL syntax.
// creates an array of question marks and then converts them into a placeholder string
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string into arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Big Juicy Burger => 'Big Juicy Burger')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // changes the key/value into SQL syntax and adds to it to the arra, e.g. {not_devoured: true} => ["not_devoured=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}


var orm = {
    //queries database for all burgers to display the two lists
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";        
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);
            cb(result);
        });
    },
    //server queries database to create a new row with a value passed, this needs to populate burger_name with the input from the text box"
    insertOne: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";


        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) throw err;
            console.log(result);
            cb(result);
        });
    },
    //update devoured field to true so burger can move into devoured list
    updateOne: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition + ";";

        console.log(queryString);
        connection.query(queryString, function(err, result) {
          
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};

//make orm available for the burger.js file in models
module.exports = orm;