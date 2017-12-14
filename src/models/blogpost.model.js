import mongoose from 'mongoose'

// Indexes:
// db.blogposts.ensureIndex( { "_id": 1 } )

// Schema
var schema = mongoose.Schema({
  _id: {
    type: Number
  },
  title: {
    type: String,
    trim: true
  },
  content: String,
  metaTags: String,
  createdDate: Date,
  commentsCount: Number,
  viewsCount: Number
})

// Options
schema.set('toJSON', {virtuals: true})

// Virtuals
schema.virtual('slug').get(function() {
  return this.title.toLowerCase().replace(/[\s]+/g, '-')
})

// schema.virtual('commentsPageSize').get(function() {
//   return 10
// })
//
// schema.virtual('commentPages').get(function() {
//   //an array of page numbers
//   if (this.commentsCount) {
//     var arr = []
//     for (var i = 1 i <= Math.ceil(this.commentsCount / this.commentsPageSize) i++) {
//       arr.push(i)
//     }
//     return arr
//   }
// })

schema.virtual('createdDateDesc').get(function() {
  if (this.createdDate) {
    return this.createdDate.getFullYear() + '/' + (this.createdDate.getMonth() + 1) + '/' + this.createdDate.getDate()
  } else {
    return ''
  }
})

export default mongoose.model('Blogpost', schema)
