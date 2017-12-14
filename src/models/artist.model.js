import mongoose from 'mongoose'

// Indexes:
// db.artists.ensureIndex( { "_id": 1 } )
// db.artists.ensureIndex( { "name": 1 }, { unique: true } )
// db.artists.ensureIndex( { "songsCount": -1 } )
// db.artists.ensureIndex( { "likersCount": -1 } )

// Schema
const schema = new mongoose.Schema({
  _id: {
    type: Number
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  image: String,
  createdDate: {
    type: Date,
    default: Date.now
  },
  likersCount: Number, //total number of users of liked the artist
  commentsCount: {
    type: Number,
    default: 0
  }, //total number of comments on the artist page
  songsCount: Number, //total number of songs
  songsPlaysCount: Number, //total number of plays on all of the artist's songs
  songsListenersCount: Number, //total number of users of played the artist's songs
  songsDownloadsCount: Number, //total number of downloads of all of the artist's songs
  songsLikedCount: Number, //total number of liked songs of all of the artist's songs
  songsImagesCount: Number, //total number of images of the artist's songs
  songsVideosCount: Number //total number of videos of the artist's songs
})

// Options
schema.set('toJSON', {virtuals: true})

// Virtuals
schema.virtual('slug').get(function() {
  return this.name.toLowerCase().replace(/[\s]+/g, '-')
})

schema.virtual('url').get(function() {
  return 'http://www.awtarika.com/artist/' + this._id + '/' + this.slug
})

schema.virtual('defaultImage').get(function() {
  if (this.image) {
    // return process.env.IMAGES_HOST + '/songs/' + this.image + '.jpg'
    return 'https://s3-ap-southeast-2.amazonaws.com/awtphase2localhostdev.images' + '/songs/' + this.image + '.jpg'
  } else {
    return null
  }
})

// schema.virtual('songsPageSize').get(function () {
//   return 20
// })
//
// schema.virtual('totalSongsPages').get(function () {
//   return Math.ceil(this.songsCount / this.songsPageSize)
// })
//
// schema.virtual('commentsPageSize').get(function () {
//   return 10
// })

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
schema.statics = {
  // /**
  //  * Get Artist
  //  */
  // get(id) {
  //   return this.findById(id)
  //     .exec()
  //     .then((artist) => {
  //       if (artist) {
  //         return artist
  //       } else {
  //         console.log('No artist')
  //         return null
  //       }
  //     })
  // },
}

export default mongoose.model('Artist', schema)
