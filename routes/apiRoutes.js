/********************************
 * apiRoutes for The Village
 * 
 * This file is used to for 
 * our routes and their
 * database calls rendring
 * 
 * @author The Village People
 * 
 * 2019-07-13
 ********************************/

var db = require("../models");

module.exports = function (app) {

  // load index page
  app.get("/", function (req, res) {
    res.render("index", {});
  });

  // load search page
  app.get("/search", function (req, res) {
    res.render("search", {});
  });

  // load by category
  app.get("/category/:category", function (req, res) {
    res.json("category: " + req.params.category);
    // db.Place.findall({ where: { category: req.params.category } }).then(function(result) {
    //   res.render("search", {
    //     example: result
    //   });
    // });
  });

  // load by username
  app.get("/user/:id", function (req, res) {
    res.json("username: " + req.params.username);
    // db.User.findOne({ where: { id: req.params.id } }).then(function(resuolt) {
    //   res.render("search", {
    //     example: result
    //   });
    // });
  });

  // load by place
  app.get("/place/:id", function (req, res) {
    res.json("place: " + req.params.place);
    // db.Place.findOne({ where: { id: req.params.id } }).then(function(result) {
    //   res.render("place", {
    //     example: result
    //   });
    // });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

  // create place
  app.post("/place", function (req, res) {
    req.json("place added");

    // var place = req.body;

    // db.Place.create({
    //   exampleOne: place.exampleOne
    // }).then(function (result) {
    //   res.redirect('back');
    // });
  });

  // create review
  app.post("/review", function (req, res) {
    req.json("review added");
    // var review = req.body;

    // db.Review.create({
    //   exampleOne: review.exampleOne
    // }).then(function (result) {
    //   res.redirect('back');
    // });
  });

  // create user
  app.post("/user", function (req, res) {
    // these are possible responses to return to the front end
    var dupResponse = "duplicate email";  // email is already in the database for a different use
    var okResponse = "ok";                // user created successfully
    var alreadyRegResponse = "already registered"; // user already in database
    // determine if user already exists:
    db.User.count({
      where: {
        user_name: req.body.username,
        email_address: req.body.email,
      }
    }).then(count => {
      // if count is zero then this one is new.
      // if it alredy exists then no need to do anything more to db
      if (count === 0) {
        db.User.create({
          user_name: req.body.username,
          email_address: req.body.email,
        }).then(function (dbUserCreateResult) {
          res.status(200).end(okResponse);
        })
          .catch(function (err) {
            // Whenever a validation or flag fails, an error is thrown
            // We can "catch" the error to prevent it from being "thrown", which could crash our node app
            // this probably means someone is re-using an aleady existing email address
            // email address is unique in the User table so this will throw an error
            console.log(`
            Error in post for User db:
            Error Name: ${err.name}
            Error Code: ${err.parent.code}
            Error SQL Message: ${err.parent.sqlMessage}
            failed to add new User
            `);
            res.status(200).end(dupResponse);
          });
      } else {
        // User already exists just respond with ok
        console.log("User " + req.body.username + " " + req.body.email + " already in Database");
        res.status(200).end(alreadyRegResponse);
      }
    })
  });

  // delete place
  app.delete("/place/:id", function (req, res) {
    // db.Place.destroy({
    //   where: {
    //     id: req.params.id
    //   }
    // }).then(function (result) {
    //   res.json(result);
    // })
  });

  // delete review
  app.delete("/review/:id", function (req, res) {
    // db.Review.destroy({
    //   where: {
    //     id: req.params.id
    //   }
    // }).then(function (result) {
    //   res.json(result);
    // })
  });

  // delete user
  app.delete("/user/:id", function (req, res) {
    // db.User.destroy({
    //   where: {
    //     id: req.params.id
    //   }
    // }).then(function (result) {
    //   res.json(result);
    // })
  });
};
