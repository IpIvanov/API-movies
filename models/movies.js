const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const MovieSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  released_on: {
    type: String,
    trim: true,
    required: true
  },
  disk: {
    type: String,
    trim: true,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  isWatched: {
    type: Boolean,
    default: false,
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Movie', MovieSchema)
