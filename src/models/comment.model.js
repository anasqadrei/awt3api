import mongoose from 'mongoose'

// Indexes:
// db.comments.ensureIndex( { "_id": 1 } )
// db.comments.ensureIndex( { "reference.id": 1, "parent": 1, "reference.collection": 1 } )

// Schema
var schema = mongoose.Schema({
  _id: {
    type: Number
  },
  text: {
    type: String,
    trim: true,
    validate: validateText
  },
  reference: {
    collection: String,
    id: Number
  },
  parent: {
    type: Number,
    ref: 'Comment'
  },
  children: [
    {
      type: Number,
      ref: 'Comment'
    }
  ],
  user: {
    type: Number,
    ref: 'User',
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  likers: [
    {
      type: Number,
      ref: 'User'
    }
  ]
})

// Options
schema.set('toJSON', {virtuals: true})

// Validators
function validateText(str) {
  if (str && str.length < 2000) {
    return true
  } else {
    return false
  }
}

// Virtuals
schema.virtual('likes').get(function() {
  if (this.likers) {
    return this.likers.length
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

export default mongoose.model('Comment', schema)
