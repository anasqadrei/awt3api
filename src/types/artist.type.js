import {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList} from 'graphql'

export default new GraphQLObjectType({
  name: 'Artist',
  description: 'Artist data from database and virtuals',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    image: {
      type: GraphQLString
    },
    createdDate: {
      type: GraphQLString
    },
    likersCount: {
      type: GraphQLInt
    },
    commentsCount: {
      type: GraphQLInt
    },
    songsCount: {
      type: GraphQLInt
    },
    songsPlaysCount: {
      type: GraphQLInt
    },
    songsListenersCount: {
      type: GraphQLInt
    },
    songsDownloadsCount: {
      type: GraphQLInt
    },
    songsLikedCount: {
      type: GraphQLInt
    },
    songsImagesCount: {
      type: GraphQLInt
    },
    songsVideosCount: {
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
    // songsPageSize: {
    //   type: GraphQLInt
    // },
    // totalSongsPages: {
    //   type: GraphQLInt
    // },
    // commentsPageSize: {
    //   type: GraphQLInt
    // },
    createdDateIso8601: {
      type: GraphQLString
    }
  })
})
