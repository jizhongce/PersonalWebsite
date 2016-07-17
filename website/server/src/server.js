// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();
var bodyParser = require('body-parser');
var validate = require('express-jsonschema').validate;
var mongo_express = require('mongo-express/lib/middleware');
var mongo_express_config = require('mongo-express/config.default.js');
var MongoDB = require('mongodb');
var ObjectID = MongoDB.ObjectID;
var commentSchema = require('./schemas/comment.json');
var commentSchema2 = require('./schemas/comment2.json');
var MongoClient = MongoDB.MongoClient;
var url = 'mongodb://localhost:27017/JZCWEB';

MongoClient.connect(url, function(err, db) {

  if (err) {
      throw new Error("Could not connect to database: " + err);
    }
  // Support receiving text in HTTP request bodies
  app.use(bodyParser.text());
  // Support receiving JSON in HTTP request bodies
  app.use(bodyParser.json());
  app.use('/mongo_express',mongo_express(mongo_express_config));
  app.use(express.static('../client/build'));

  function sendDatabaseError(res, err) {
    res.status(500).send("A database error occurred: " + err);
  }

  //resolve all user
  function simpleresloveallusers(callback){
    db.collection('users').find({}).toArray(function(err, users) {
      if (err) {
        return callback(err);
      }
      var userMap = {};
      users.forEach((user) => {
        userMap[user._id] = user;
      });
      callback(null, userMap);
    });
  }

  //Function for comment start from here
  function postNewComment(lastname, firstname, email, contents, postdate, callback){

    var newuser = {
      "LastName": lastname,
      "FirstName": firstname,
      "email": email
    };

    db.collection('users').insertOne(newuser,function(err,result){
      if (err) {
        return callback(err);
      }

      newuser._id = result.insertedId;

      var newcomment = {
        "author": newuser._id,
        "contents": contents,
        "postDate": postdate,
        "replys": []
      };

      db.collection('comments').insertOne(newcomment,function(err,result){
          if (err) {
            return callback(err);
          }
          newcomment._id = result.insertedId;
          db.collection('comments').find({}).toArray(function(err,comments){
            if (err) {
              return sendDatabaseError(res,err);
            }
            simpleresloveallusers(function(err,usermap){
              if (err) {
                return sendDatabaseError(res,err);
              }
              for (var i = 0; i < comments.length; i++) {
                comments[i].author = usermap[comments[i].author];
                comments[i].replys.forEach((reply)=>{reply.author = usermap[reply.author]});
              }
              callback(null,comments);
            });
          });
      });
    });
  }

  app.post('/firsttimecomment/',validate({ body: commentSchema}),function(req,res){
    var newcomment = req.body;
    postNewComment(newcomment.LastName, newcomment.FirstName, newcomment.Email, newcomment.Contents, newcomment.postDate, function(err,comment){
      if (err) {
        return sendDatabaseError(res,err);
      }
      res.status(201);
      res.send(comment);
    });
  });

  //Function for second post comment
  function secondpostcomment(Emailaddress, contents, postdate, callback){
    db.collection('users').findOne({ email: Emailaddress }, function(err, userdata){
      if (err) {
        return sendDatabaseError(res,err);
      }
      var newcomment = {
        "author" : userdata._id,
        "contents": contents,
        "postDate": postdate,
        "replys": []
      };

      db.collection('comments').insertOne(newcomment,function(err,result){
          if (err) {
            return callback(err);
          }
          newcomment._id = result.insertedId;
          db.collection('comments').find({}).toArray(function(err,comments){
            if (err) {
              return sendDatabaseError(res,err);
            }
            simpleresloveallusers(function(err,usermap){
              if (err) {
                return sendDatabaseError(res,err);
              }
              for (var i = 0; i < comments.length; i++) {
                comments[i].author = usermap[comments[i].author];
                comments[i].replys.forEach((reply)=>{reply.author = usermap[reply.author]});
              }
              callback(null,comments);
            });
          });
      });
    });
  }

  app.post('/secondtimecomment/',validate({ body: commentSchema2}),function(req,res){
    var newcomment = req.body;
    secondpostcomment(newcomment.Email, newcomment.Contents, newcomment.postDate, function(err,comment){
      if (err) {
        return sendDatabaseError(res,err);
      }
      res.status(201);
      res.send(comment);
    });
  });

  //Function for Reply
  function FirstReply(commentid, lastname, firstname, email, contents, postdate, callback){
    var newuser = {
      "LastName": lastname,
      "FirstName": firstname,
      "email": email
    };

    db.collection('users').insertOne(newuser, function(err, result){
      if (err) {
        return sendDatabaseError(res,err);
      }
      newuser._id = result.insertedId;

      var newreply = {
        "author": newuser._id,
        "contents": contents,
        "postDate": postdate
      };
      db.collection('comments').updateOne({_id:commentid},
      { $push: {replys: newreply}}, function(err){
        if (err) {
          return sendDatabaseError(res,err);
        }
        db.collection('comments').find({}).toArray(function(err,comments){
          if (err) {
            return sendDatabaseError(res,err);
          }
          simpleresloveallusers(function(err,usermap){
            if (err) {
              return sendDatabaseError(res,err);
            }
            for (var i = 0; i < comments.length; i++) {
              comments[i].author = usermap[comments[i].author];
              comments[i].replys.forEach((reply)=>{reply.author = usermap[reply.author]});
            }
            callback(null,comments);
          });
        });
      });
    });
  }

  app.post('/firstcomment/:commentid/reply/',validate({ body: commentSchema}),function(req,res){
    var commentid = new ObjectID(req.params.commentid);
    var newreply = req.body;
    FirstReply(commentid,newreply.LastName, newreply.FirstName, newreply.Email, newreply.Contents, newreply.postDate, function(err,comment){
      if (err) {
        return sendDatabaseError(res,err);
      }
      res.status(201);
      res.send(comment);
    });
  });

  //function for second reply
  function SecondReply(commentid, Emailaddress, contents, postdate, callback){
    db.collection('users').findOne({email: Emailaddress}, function(err, userdata){
      if (err) {
        return sendDatabaseError(res,err);
      }
      var newreply = {
        "author": userdata._id,
        "contents": contents,
        "postDate": postdate
      };
      db.collection('comments').updateOne({_id:commentid},
      { $push: {replys: newreply}}, function(err){
        if (err) {
          return sendDatabaseError(res,err);
        }
        db.collection('comments').find({}).toArray(function(err,comments){
          if (err) {
            return sendDatabaseError(res,err);
          }
          simpleresloveallusers(function(err,usermap){
            if (err) {
              return sendDatabaseError(res,err);
            }
            for (var i = 0; i < comments.length; i++) {
              comments[i].author = usermap[comments[i].author];
              comments[i].replys.forEach((reply)=>{reply.author = usermap[reply.author]});
            }
            callback(null,comments);
          });
        });
      });
    });
  }

  app.post('/secondcomment/:commentid/reply/',validate({ body: commentSchema2}), function(req,res){
    var commentid = new ObjectID(req.params.commentid);
    var newreply = req.body;
    SecondReply(commentid,newreply.Email, newreply.Contents, newreply.postDate, function(err,comment){
      if (err) {
        return sendDatabaseError(res,err);
      }
      res.status(201);
      res.send(comment);
    });
  });

  app.get('/comments', function(req,res){
    db.collection('comments').find({}).toArray(function(err,comments){
      if (err) {
        return sendDatabaseError(res,err);
      }
      simpleresloveallusers(function(err,usermap){
        if (err) {
          return sendDatabaseError(res,err);
        }
        for (var i = 0; i < comments.length; i++) {
          comments[i].author = usermap[comments[i].author];
          comments[i].replys.forEach((reply)=>{reply.author = usermap[reply.author]});
        }
        res.send(comments);
      });
    });
  });







  app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
  });




});
