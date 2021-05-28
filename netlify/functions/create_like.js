// Goal: Provide a function to "like" a post in Firebase
// Requirement: "Likes" are user-specific – a user can "like" a post, but only once.
// Currently, the "number of likes" on a post isn't user-specific, nor does it prevent an
// unlimited number of likes. How would we expand/refactor our domain model to support this?

// allows us to use firebase
let firebase = require(`./firebase`)

exports.handler = async function(event) {

  // write the recipe and the implementation
  let uid = event.queryStringParameters.uid
  let postId = event.queryStringParameters.postId

  console.log(`uid is ${uid}`)

  console.log(`provided postId is ${postId}`)
  // establish a connection to firebase in memory
  let db = firebase.firestore()

  let likeData = await db.collection(`likes`).get()
  let likes = likeData.docs

  let userExists = 0

  for (let i=0; i < likes.length; i++) {
    let likePosts = likes[i].data()

    if (likePosts.uid == uid && likePosts.postId == postId) {
      userExists++
    }
  }

  if (userExists == 0) {
    let likesQuery = await db.collection(`likes`).add({
      postId: postId,
      uid: uid
    })
  }


  // let postsQuery = await db.collection(`posts`).get()

  // // get the documents from the query
  // let posts = postsQuery.docs

  // // loop through the posts documents lookig for the correct post
  // for (let postsIndex=0; postsIndex < posts.length; postsIndex++) {
  //   // get the id from the comment document
  //   let postsId = posts[postsIndex].id
  //   let currentPost = posts[postsIndex]
  //   console.log(`postsId is ${postsId}`)

  //   if (postsId == postId) {
  //     let likeData = currentPost.data()
  //     console.log(`like data is ${likeData}`)
  //     console.log(`number of likes is ${likeData.numberOfLikes}`)
  //     let numberOfLikes = likeData.numberOfLikes
  //     numberOfLikes++
  //     console.log(`number of incremented likes is ${numberOfLikes}`)
  //     await db.collection(`posts`).doc(postsId).update({
  //       numberOfLikes: numberOfLikes
  //     })
  //   }
  // }


  return {
    statusCode: 200
  }
}