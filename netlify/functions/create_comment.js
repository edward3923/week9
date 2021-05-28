// Goal: Provide a function to create a new comment in Firebase

// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/create_comment?postId=xxxxxxxxx&userName=Brian&body=Tacos!
exports.handler = async function(event) {

  console.log(event)

  // get the three querystring parameters and store in memory
  let postId = event.queryStringParameters.postId
  let userName = event.queryStringParameters.userName
  let body = event.queryStringParameters.body


  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // create a new post, wait for it to return
  db.collection(`comments`).add({
    body: body,
    postId: postId,
    userName: userName,
    created: firebase.firestore.FieldValue.serverTimestamp()
  })

  return {
    statusCode: 200
  }
}

