import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'
import ArtistType from './types/artist.type'
import BlogpostType from './types/blogpost.type'
import CommentType from './types/comment.type'
import SongType from './types/song.type'
import UserType from './types/user.type'
import resolvers from './resolvers'

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'All Query Operations',
  fields: () => ({
    //operation artist
    artist: {
      //output type
      type: ArtistType,
      //input type
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      //function
      resolve: (root, args) => {
        return resolvers.getArtist(args)
      }
    },
    //operation artists list
    artistsList: {
      //output type
      type: new GraphQLList(ArtistType),
      //input type
      args: {
        page: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        pageSize: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        sort: {
          type: GraphQLString
        }
      },
      //function
      resolve: (root, args) => {
        return resolvers.getArtistsList(args)
      }
    },
    //operation blogpost
    blogpost: {
      //output type
      type: BlogpostType,
      //input type
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      //function
      resolve: (root, args) => {
        return resolvers.getBlogpost(args)
      }
    },
    //operation comments list
    commentsList: {
      //output type
      type: new GraphQLList(CommentType),
      //input type
      args: {
        collection: {
          type: new GraphQLNonNull(GraphQLString)
        },
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        page: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        pageSize: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      //function
      resolve: (root, args) => {
        return resolvers.getCommentsList(args)
      }
    },
    //operation song
    song: {
      //output type
      type: SongType,
      //input type
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      //function
      resolve: (root, args) => {
        return resolvers.getSong(args)
      }
    },
    //operation songs list by artist
    songsListByArtist: {
      //output type
      type: new GraphQLList(SongType),
      //input type
      args: {
        artistId: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        page: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        pageSize: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        sort: {
          type: GraphQLString
        }
      },
      //function
      resolve: (root, args) => {
        return resolvers.getSongsListByArtist(args)
      }
    },
    //operation recently added songs
    recentlyAddedSongs: {
      //output type
      type: new GraphQLList(SongType),
      //input type
      args: {
        page: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        pageSize: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      //function
      resolve: (root, args) => {
        return resolvers.getRecentlyAddedSongs(args)
      }
    },
    //operation user
    user: {
      //output type
      type: UserType,
      //input type
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      //function
      resolve: (root, args) => {
        return resolvers.getUser(args)
      }
    }
  })
})

export default new GraphQLSchema({query: RootQueryType})
