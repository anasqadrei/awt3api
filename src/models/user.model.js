import mongoose from 'mongoose'

// Indexes:
// db.users.ensureIndex( { "_id": 1 } )
// db.users.ensureIndex( { "emails": 1 } )
// db.users.ensureIndex( { "profiles.provider": 1, "profiles.providerId": 1 }, { unique: true, sparse: true } )

// Schema
const schema = new mongoose.Schema({
  _id: {
    type: Number
  },
  username: {
    type: String,
    trim: true,
    required: true
  },
  emails: [
    {
      type: String,
      trim: true,
      lowercase: true
    }
  ],
  image: String,
  signature: {
    type: String,
    trim: true
  },
  birthDate: Date,
  sex: String,
  country: {
    type: Number,
    ref: 'Country'
  },
  joined: {
    type: Date,
    default: Date.now
  },
  lastSeen: Date,
  admin: {
    type: Boolean,
    default: false
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  lastUpdatedProvider: String,
  profiles: [
    {
      provider: String,
      providerId: String,
      data: {}
    }
  ],
  recentlyPlayed: [Number]
})

// Options
schema.set('toJSON', {virtuals: true})

// Virtuals
schema.virtual('sexDesc').get(function() {
  if (this.sex === 'm') {
    return 'ذكر'
  } else if (this.sex === 'f') {
    return 'أنثى'
  } else {
    return ''
  }
})

schema.virtual('slug').get(function() {
  return this.username.toLowerCase().replace(/[\s]+/g, '-')
})

schema.virtual('defaultImage').get(function() {
  if (this.image) {
    if (this.image.match(/^\d+$/)) {
      return process.env.IMAGES_HOST + '/users/' + this.image + '.jpg'
    } else {
      return this.image
    }
  } else {
    return null
  }
})

schema.virtual('isOnline').get(function() {
  //600000 milli-sec = 10 min timeout. otherwise assume user is not online.
  var timout = 600000
  if (Date.now() - this.lastSeen < timout) {
    return true
  } else {
    return false
  }
})

schema.virtual('lastSeenDesc').get(function() {
  if (this.lastSeen) {
    return this.lastSeen.getFullYear() + '/' + (this.lastSeen.getMonth() + 1) + '/' + this.lastSeen.getDate()
  } else {
    return ''
  }
})

// Instance Methods
schema.method({})

// Static Methods
schema.statics = {}

export default mongoose.model('User', schema)
