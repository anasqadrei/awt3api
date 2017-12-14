import {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList} from 'graphql'
import ArtistType from './artist.type'
import SongImageType from './song-image.type'
import SongLyricsType from './song-lyrics.type'
import UserType from './user.type'
import resolvers from '../resolvers'

export default new GraphQLObjectType({
  name: 'Song',
  description: 'Song data from database and virtuals',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    title: {
      type: GraphQLString
    },
    artist: {
      type: ArtistType,
      resolve: (root) => {
        return resolvers.getArtist({id: root.artist})
      }
    },
    desc: {
      type: GraphQLString
    },
    tags: {
      type: new GraphQLList(GraphQLString)
    },
    createdDate: {
      type: GraphQLString
    },
    commentsCount: {
      type: GraphQLInt
    },
    playsCount: {
      type: GraphQLInt
    },
    listenersCount: {
      type: GraphQLInt
    },
    downloadsCount: {
      type: GraphQLInt
    },
    likesCount: {
      type: GraphQLInt
    },
    dislikesCount: {
      type: GraphQLInt
    },
    images: {
      type: new GraphQLList(SongImageType),
      resolve: (root) => {
        return resolvers.getSongImages({ids: root.images})
      }
    },
    image: {
      type: GraphQLString
    },
    lyrics: {
      type: SongLyricsType,
      resolve: (root) => {
        return resolvers.getSongLyrics({id: root.lyrics})
      }
    },
    uploader: {
      type: UserType,
      resolve: (root) => {
        return resolvers.getUser({id: root.uploader})
      }
    },
    fileSize: {
      type: GraphQLInt
    },
    duration: {
      type: GraphQLInt
    },
    fileType: {
      type: GraphQLString
    },
    bitrate: {
      type: GraphQLInt
    },
    sampleRate: {
      type: GraphQLInt
    },
    slug: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    defaultImage: {
      type: GraphQLString
    },
    durationDesc: {
      type: GraphQLString
    },
    durationIso8601: {
      type: GraphQLString
    },
    fileSizeDesc: {
      type: GraphQLString
    },
    sampleRateDesc: {
      type: GraphQLString
    },
    bitrateDesc: {
      type: GraphQLString
    },
    createdDateDesc: {
      type: GraphQLString
    },
    createdDateIso8601: {
      type: GraphQLString
    }
  })
})
