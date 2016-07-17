var ObjectID = require('mongodb').ObjectID;

var databaseName = "JZCWEB";

var initialData = {
  "users": {
    //this is you
    "1": {
      "_id": new ObjectID("000000000000000000000001"),
      "LastName": "Ji",
      "FirstName": "Zhongce",
      "email": "jizhongce123@gmail.com"
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"),
      "LastName": "Ji",
      "FirstName": "Zhongnan",
      "email": "jizhongnan123@gmail.com"
    }

  },

  "comments":{
    "1": {
      "_id": new ObjectID("000000000000000000000001"),
      "author": new ObjectID("000000000000000000000001"),
      "contents": "hello everyone, this is my first website version 0.01",
      "postDate": 1451973470000,
      "replys": [
        {
             // The author of the comment.
             "author": new ObjectID("000000000000000000000002"),
             // The contents of the comment.
             "contents": "you are very nice!",
             // The date the comment was posted.
             // 01/24/16 22:00 EST
             "postDate": 1453690800000
         },
        {
             // The author of the comment.
             "author": new ObjectID("000000000000000000000001"),
             // The contents of the comment.
             "contents": "I am very nice!",
             // The date the comment was posted.
             // 01/24/16 22:00 EST
             "postDate": 1453690800000
         }
       ]
    },

    "2": {
      "_id": new ObjectID("000000000000000000000002"),
      "author": new ObjectID("000000000000000000000002"),
      "contents": "hello everyone, this is my first website version 0.02",
      "postDate": 1453668480000,
      "replys": [
        {
             // The author of the comment.
             "author": new ObjectID("000000000000000000000001"),
             // The contents of the comment.
             "contents": "Thanks!",
             // The date the comment was posted.
             // 01/24/16 22:00 EST
             "postDate": 1453690800000
         }
       ]
    }
  }

};


  function addIndexes(db, cb) {
    db.collection('comments').createIndex({ "contents": "text" }, null, cb);
  }
  /**
   * Resets a collection.
   */
  function resetCollection(db, name, cb) {
    // Drop / delete the entire object collection.
    db.collection(name).drop(function() {
      // Get all of the mock objects for this object collection.
      var collection = initialData[name];
      var objects = Object.keys(collection).map(function(key) {
        return collection[key];
      });
      // Insert objects into the object collection.
      db.collection(name).insertMany(objects, cb);
    });
  }

  /**
   * Reset the MongoDB database.
   * @param db The database connection.
   */
  function resetDatabase(db, cb) {
    // The code below is a bit complex, but it basically emulates a
    // "for" loop over asynchronous operations.
    var collections = Object.keys(initialData);
    var i = 0;

    // Processes the next collection in the collections array.
    // If we have finished processing all of the collections,
    // it triggers the callback.
    function processNextCollection() {
      if (i < collections.length) {
        var collection = collections[i];
        i++;
        // Use myself as a callback.
        resetCollection(db, collection, processNextCollection);
      } else {
        addIndexes(db,cb);
      }
    }

    // Start processing the first collection!
    processNextCollection();
  }

  // Check if called directly via 'node', or required() as a module.
  // http://stackoverflow.com/a/6398335
  if(require.main === module) {
    // Called directly, via 'node src/resetdatabase.js'.
    // Connect to the database, and reset it!
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/' + databaseName;
    MongoClient.connect(url, function(err, db) {
      if (err) {
        throw new Error("Could not connect to database: " + err);
      } else {
        console.log("Resetting database...");
        resetDatabase(db, function() {
          console.log("Database reset!");
          // Close the database connection so NodeJS closes.
          db.close();
        });
      }
    });
  } else {
    // require()'d.  Export the function.
    module.exports = resetDatabase;
  }
