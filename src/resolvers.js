import Artist from './models/artist.model'
import Blogpost from './models/blogpost.model'
import Comment from './models/comment.model'
import Country from './models/country.model'
import SongImage from './models/song-image.model'
import SongLyrics from './models/song-lyrics.model'
import Song from './models/song.model'
import User from './models/user.model'

export default {
  getArtist : async(args) => {
    return await Artist.findById(args.id)
  },
  getArtistsList : async(args) => {
    let query = Artist.find()
    if (args.sort) {
      query.sort(args.sort)
    }
    query.skip((args.page - 1) * args.pageSize).limit(args.pageSize)
    return await query
  },
  getBlogpost : async(args) => {
    return await Blogpost.findById(args.id)
  },
  getComment : async(args) => {
    return await Comment.findById(args.id)
  },
  getCommentsList : async(args) => {
    if (args.ids) {
      return await Comment.find({
        _id: {
          $in: args.ids
        }
      })
    } else if (args.collection && args.id) {
      return await Comment.find({
        "reference.collection": args.collection,
        "reference.id": args.id,
        "parent": {
          $exists: false
        }
      }).sort('-createdDate').skip((args.page - 1) * args.pageSize).limit(args.pageSize)
    } else {
      return null
    }
  },
  getCountry : async(args) => {
    return await Country.findById(args.id)
  },
  getSongImages : async(args) => {
    return await SongImage.find({
      _id: {
        $in: args.ids
      }
    })
  },
  getSongLyrics : async(args) => {
    return await SongLyrics.findById(args.id)
  },
  getSong : async(args) => {
    return await Song.findById(args.id).populate('artist')
  },
  getSongs : async(args) => {
    return await Song.find({
      _id: {
        $in: args.ids
      }
    }).populate('artist')
  },
  getUser : async(args) => {
    return await User.findById(args.id)
  },
  getUsers : async(args) => {
    return await User.find({
      _id: {
        $in: args.ids
      }
    })
  }
}
