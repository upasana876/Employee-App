const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  author: String,
  content: String,
  image: String,
  likes: [String],
  comments: [{
    user: String,
    text: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);