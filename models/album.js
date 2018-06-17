const mongoose = require('mongoose');

const { Schema } = mongoose;

const Album = new Schema({
  title: String,
  discogsId: { type: Number, unique: true },
  artist: [Schema.Types.Mixed],
  thumb: String,
  country: String,
  formats: [Schema.Types.Mixed],
  genres: [Schema.Types.Mixed],
  images: [Schema.Types.Mixed],
  labels: [Schema.Types.Mixed],
  notes: String,
  released: String,
  styles: [String],
  tracklist: [Schema.Types.Mixed],
  year: Number,
});

module.exports = mongoose.model('Album', Album);
