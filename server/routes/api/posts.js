const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Post
// ('/') is referenced to /api/posts declared in index.js
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Delete Post


// Connects to the mLab db by passing the URL provided by the database
// useNewUrlParser: true - Fixes the error / warning thrown by mongo
async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect('mongodb://max123:max123@ds013320.mlab.com:13320/vue_express', {
    useNewUrlParser: true
  })

  return client.db('vue_express').collection('posts');
}

module.exports = router;
