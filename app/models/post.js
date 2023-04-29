const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  content: String
});

const Post = mongoose.model('post', postSchema);

module.exports = {
  Post
};