import mongoose from 'mongoose'

// Indexes:
// db.songs.ensureIndex( { "_id": 1 } )
// db.songs.ensureIndex( { "artist": 1 } )
// db.songs.ensureIndex( { "tags": 1, "createdDate": -1 } )
// db.songs.ensureIndex( { "playsCount": -1 } )
// db.songs.ensureIndex( { "likesCount": -1 } )
// db.songs.ensureIndex( { "title": 1 } )
// db.songs.ensureIndex( { "uploader": 1 } )

// Schema
const schema = new mongoose.Schema({
  _id: {
    type: Number
  },
  title: {
    type: String,
    trim: true,
    required: true
  },
  artist: {
    type: Number,
    ref: 'Artist',
    required: true
  },
  desc: {
    type: String,
    trim: true
  },
  tags: [
    {
      type: String,
      trim: true
    }
  ],
  createdDate: {
    type: Date,
    default: Date.now
  },
  // lastUpdated: { type: Date, default: Date.now },  use this in case of modification and also add it to the xml file
  commentsCount: {
    type: Number,
    default: 0
  },
  playsCount: {
    type: Number,
    default: 0
  },
  listenersCount: {
    type: Number,
    default: 0
  },
  downloadsCount: {
    type: Number,
    default: 0
  },
  likesCount: {
    type: Number,
    default: 0
  },
  dislikesCount: {
    type: Number,
    default: 0
  },
  images: [
    {
      type: Number,
      ref: 'SongImage'
    }
  ],
  image: String,
  lyrics: {
    type: Number,
    ref: 'SongLyrics'
  },
  uploader: {
    type: Number,
    ref: 'User',
    required: true
  },
  fileSize: Number,
  duration: Number,
  fileType: {
    type: String,
    trim: true,
    uppercase: true
  },
  bitrate: Number,
  sampleRate: Number
})

// Options
schema.set('toJSON', {virtuals: true})

// Virtuals
schema.virtual('slug').get(function() {
  return this.title.toLowerCase().replace(/[\s]+/g, '-') + '-' + this.artist.slug
})

schema.virtual('url').get(function() {
  return process.env.WEBSITE_URL + '/song/' + this._id + '/' + this.slug
})

schema.virtual('defaultImage').get(function() {
  if (this.image) {
    return process.env.IMAGES_HOST + '/songs/' + this.image + '.jpg'
  } else {
    return null
  }
})

// schema.virtual('commentsPageSize').get(function () {
//   return 10
// })
//
// //an array of page numbers
// schema.virtual('commentPages').get(function () {
//   if(this.commentsCount){
//     var arr = []
//     for(var i = 1 i <= Math.ceil(this.commentsCount/this.commentsPageSize) i++){
//       arr.push(i)
//     }
//     return arr
//   }
// })

schema.virtual('durationDesc').get(function() {
  var str = new Date(null, null, null, null, null, this.duration / 1000).toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0].replace(/^00:/, '').replace(/^[0]+/, '')
  //fix if duration is less than a min. add 00 as minutes
  if (str.length === 3) {
    str = '0' + str
  }
  return str
})

schema.virtual('durationIso8601').get(function() {
  var dt = new Date(null, null, null, null, null, this.duration / 1000)
  var str = 'PT'
  if (dt.getHours()) {
    str += dt.getHours() + 'H'
  }
  if (dt.getMinutes()) {
    str += dt.getMinutes() + 'M'
  }
  if (dt.getSeconds()) {
    str += dt.getSeconds() + 'S'
  }
  return str
})

schema.virtual('fileSizeDesc').get(function() {
  return (this.fileSize / 1000000).toFixed(1) + ' MB'
})

schema.virtual('sampleRateDesc').get(function() {
  return (this.sampleRate / 1000).toFixed(3) + ' kHz'
})

schema.virtual('bitrateDesc').get(function() {
  return (this.bitrate / 1000).toFixed(0) + ' kbps'
})

schema.virtual('createdDateDesc').get(function() {
  if (this.createdDate) {
    return this.createdDate.getFullYear() + '/' + (this.createdDate.getMonth() + 1) + '/' + this.createdDate.getDate()
  } else {
    return ''
  }
})

schema.virtual('createdDateIso8601').get(function() {
  if (this.createdDate) {
    return this.createdDate.toISOString()
  } else {
    return ''
  }
})

// Instance Methods
schema.method({})

// Static Methods
schema.statics = {}

export default mongoose.model('Song', schema)
