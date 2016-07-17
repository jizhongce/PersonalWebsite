//Post Comment
export function NewUserPostComment(Lastname, Firstname, email, contents,cb){
  sendXHR('POST','/firsttimecomment/',
  {
    LastName: Lastname,
    FirstName: Firstname,
    Email: email,
    Contents: contents,
    postDate: new Date().getTime()
  },(xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

//Second time post comment
export function SecondTimePostComment(email, contents,cb){
  sendXHR('POST','/secondtimecomment/',
  {
    Email: email,
    Contents: contents,
    postDate: new Date().getTime()
  },(xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

//First time post comment reply
export function FirstReplyComment(commentid, Lastname, Firstname, email, contents,cb){
  sendXHR('POST','/firstcomment/'+commentid+'/reply/',
  {
    LastName: Lastname,
    FirstName: Firstname,
    Email: email,
    Contents: contents,
    postDate: new Date().getTime()
  },(xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

//Second time post comment reply
export function SecondReplyComment(commentid, email, contents,cb){
  sendXHR('POST','/secondcomment/'+commentid+'/reply/',
  {
    Email: email,
    Contents: contents,
    postDate: new Date().getTime()
  },(xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}



//get comments
export function getallcomments(cb) {
  // We don't need to send a body, so pass in 'undefined' for the body.
  sendXHR('GET', '/comments/', undefined, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });
}


/**
 * Properly configure+send an XMLHttpRequest with error handling, authorization token,
 * and other needed properties.
 */
function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  // The below comment tells ESLint that FacebookError is a global.
  // Otherwise, ESLint would complain about it! (See what happens in Atom if
  // you remove the comment...)
  /* global PWebError */

  // Response received from server. It could be a failure, though!
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      // Call the callback with the final XHR object.
      cb(xhr);
    } else {
      // Client or server error.
      // The server may have included some response text with details concerning
      // the error.
      var responseText = xhr.responseText;
      PWebError('Could not ' + verb + " " + resource + ": Received " + statusCode + " " + statusText + ": " + responseText);
    }
  });

  // Time out the request if it takes longer than 10,000 milliseconds (10 seconds)
  xhr.timeout = 10000;

  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    PWebError('Could not ' + verb + " " + resource + ": Could not connect to the server.");
  });

  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    PWebError('Could not ' + verb + " " + resource + ": Request timed out.");
  });

  switch (typeof(body)) {
    case 'undefined':
      // No body to send.
      xhr.send();
      break;
    case 'string':
      // Tell the server we are sending text.
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(body);
      break;
    case 'object':
      // Tell the server we are sending JSON.
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Convert body into a JSON string.
      xhr.send(JSON.stringify(body));
      break;
    default:
      throw new Error('Unknown body type: ' + typeof(body));
  }
}
