var express = require("express");

var router = express.Router();

// var rivecriptTriggers = require("../rivescript/rivescript.js")
// Import the model (chatbot.js) to use its database functions.
var chatbot = require("../models/chatbotMods.js");
var RiveScript = require("rivescript");

var bot = new RiveScript();
bot.sortReplies();

bot.loadFile("./public/assets/js/brain.rive").then(brainReady).catch(brainError);

// Display on the console if bot is ready
function brainReady() {
  console.log("The supreme chat intelligence is ready to talk");
  bot.sortReplies();
  var num = Math.floor((Math.random() * 100) + 1);
  console.log(num);
  // var reply = bot.reply("local-user", "set " + num);
}

// Display on console if bot has errors
function brainError() {
  console.log("The supreme chat intelligence has encountered an error");
  console.log();
}

var replyBot;

bot.setSubroutine("learn", function (rs, args) {
  var DEBUG = false; // set it to true if you want some internal log noise

  var say = function (msg) {
    if (DEBUG) {
      console.debug(msg);
    }
  };

  return new Promise(function (resolve, reject) {
    let userMessage = args[0],
      botMessage = args[1],
      user = rs.currentUser();
    say(`User ${user} is teaching us: when I say "${userMessage}" you say "${botMessage}"`);
    // If we have assistance from the bot program, it can store the user's
    // full original message in a user var called `origMessage`, this way
    // we can preserve punctuation and formatting.
    rs.getUservar(user, "origMessage").then(function (origMessage) {
      if (origMessage !== "undefined") {
        // They have an original message! Re-parse it to get a better
        // pair than what the macro passed in.
        let m = origMessage.match(/^w (.+?) y (.+?)$/i);
        if (m) {
          userMessage = m[1].toLowerCase();
          botMessage = m[2].charAt(0).toUpperCase() + m[2].slice(1);
          say(`Found better userMessage='${userMessage}' and botMessage='${botMessage}'`);
          specialResponse = "OK understood";
        }
      }

      // The new RiveScript code to save.
      var code = `
// Taught to me by ${user}
+ ${userMessage}
- ${botMessage}
`;
      var reply = `I have learned: when you say "${userMessage}" I should say "${botMessage}"`;
      say(`Generated RiveScript code:\n${code}`);
      rs.stream(code); // Load it into the current running bot.
      rs.sortReplies();

      // Figure out where RiveScript is.
      var engine;
      if (typeof (window) === "object" && window["RiveScript"] !== undefined) {
        engine = window.RiveScript;
      } else if (typeof (RiveScript) === "undefined") {
        // var RiveScript = require("../../lib/rivescript");
        engine = RiveScript;
      } else {
        engine = RiveScript;
      }

      var bot = new engine();
      if (typeof (window) === "object" && typeof (window.localStorage) !== undefined) {
        // We're in a web browser so use localStorage since we can't write
        // to disk.
        if (localStorage["learned.rive"] !== undefined) {
          // Get the existing replies.
          bot.stream(localStorage["learned.rive"]);
        }
        bot.stream(code); // stream ours on top
        localStorage["learned.rive"] = bot.stringify();
        resolve(reply);
      } else {
        // Node environment. Get the existing replies and inject ours
        // on top of them.
        bot.loadFile("learned.rive").then(function () {
          say(`Loaded learned.rive`)
          bot.stream(code);
          bot.write("learned.rive");

          resolve(reply);
        }).catch(function (err) {
          // The file probably didn't exist, create the new one.
          say(`Creating new learned.rive`);
          bot.stream(code);
          bot.write("learned.rive");

          resolve(reply);
        });
      }
    });
  });
});

router.get("/", function (req, res, bot) {
  res.sendFile(("D:/DESKTOP HTML/yeetChatBot/yeetThreeChatBot/public/index.html" || "D:/DESKTOP HTML/yeetChatBot/yeetThreeChatBot/public/assets/js/script.js"));
});

router.post("/api/chatbots", function (req, res) {
  var userSaid = req.body.user_input;
  // Send what the user said to the bot
  var reply = bot.reply("local-user", userSaid);
  reply.then(function (result) {
    console.log(result);
      replyBot = result;
    chatbot.create(["user_input", "user_response", "botOn"], [req.body.user_input, replyBot, req.body.botOn], function (result) {
      // Send back the ID of the new quote
      result.user_response = replyBot;

      res.json({
        id: result.insertId,
        user_response: result
      });
    specialReply = null;
      // res.json({reply: replyBot});
    });
  });
});
router.put("/api/chatbots/:id", function (req, res) {
  var condition = "user_input = " + req.params.user_input;

  console.log("condition", condition);

  chatbot.update(
    {
      user_response: replyBot
    },
    condition,
    function (result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

router.delete("/api/chatbots/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  chatbot.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
// Export routes for server.js to use.
module.exports = router;