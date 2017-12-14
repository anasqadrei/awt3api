import mongoose from 'mongoose'

// Indexes:
// db.songimages.ensureIndex( { "_id": 1 } )
// db.songimages.ensureIndex( { "song": 1 } )

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
  createdDate: {
    type: Date,
    default: Date.now
  },
  addedBy: {
    type: Number,
    ref: 'User',
    required: true
  },
  likers: [
    {
      type: Number,
      ref: 'User'
    }
  ],
  dislikers: [
    {
      type: Number,
      ref: 'User'
    }
  ]
})

// Options
schema.set('toJSON', {virtuals: true})

// Virtuals
schema.virtual('url').get(function() {
  return process.env.IMAGES_HOST + '/songs/' + this._id + '.jpg'
})

schema.virtual('likes').get(function() {
  if (this.likers) {
    return this.likers.length
  } else {
    return 0
  }
})

schema.virtual('dislikes').get(function() {
  if (this.dislikers) {
    return this.dislikers.length
  } else {
    return 0
  }
})

schema.virtual('createdDateDesc').get(function() {
  if (this.createdDate) {
    return this.createdDate.getFullYear() + '/' + (this.createdDate.getMonth() + 1) + '/' + this.createdDate.getDate()
  } else {
    return ''
  }
})

export default mongoose.model('SongImage', schema)
