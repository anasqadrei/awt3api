import mongoose from 'mongoose'

// Indexes:
// db.songlyrics.ensureIndex( { "_id": 1 } )
// db.songlyrics.ensureIndex( { "song": 1 } )

// Schema
var schema = mongoose.Schema({
  _id: {
    type: Number
  },
  song: {
    type: Number,
    ref: 'Song',
    required: true
  },
  content: {
    type: String,
    trim: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  addedBy: {
    type: Number,
    ref: 'User',
    required: true
  }
}, {collection: 'songlyrics'})

// Options
schema.set('toJSON', {virtuals: true})

// Virtuals
schema.virtual('createdDateDesc').get(function() {
  if (this.createdDate) {
    return this.createdDate.getFullYear() + '/' + (this.createdDate.getMonth() + 1) + '/' + this.createdDate.getDate()
  } else {
    return ''
  }
})

export default mongoose.model('SongLyrics', schema)
