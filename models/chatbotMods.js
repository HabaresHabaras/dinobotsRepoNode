var orm = require("../config/orm.js");

var chatbots = {
  all: function(cb) {
    orm.all("chatbottext", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("chatbottext", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("chatbottext", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("chatbottext", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (burgersController.js).
module.exports = chatbots;
      


//* Inside `burger.js`, import `orm.js` into `burger.js`

//* Also inside `burger.js`, create the code that will call the ORM functions using burger specific input for the ORM.

//* Export at the end of the `burger.js` file. 