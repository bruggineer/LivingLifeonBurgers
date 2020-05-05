var connection = require("./connection.js");

var orm = {
    //queries database for all burgers that are true and all that are false? to display the two lists
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM" + tableInput + ";";
        console.log(query);

        connection.queryString(queryString, function (err, result) {
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
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";


        console.log(queryString);

        connection.query(queryString, [tableInput, colToSearch, valOfCol], function (err, result) {
            if (err) throw err;
            console.log(result);
        });
    },
    //this needs to change the devoured key to true so burger can move into devoured list
    updateOne: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        var query = connection.query(queryString, function (err, result) {
            console.log(query.sql)
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};


module.exports = orm;