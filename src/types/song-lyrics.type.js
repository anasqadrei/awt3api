import {GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql'
import SongType from './song.type'
import UserType from './user.type'
import resolvers from '../resolvers'

export default new GraphQLObjectType({
  name: 'SongLyrics',
  description: 'Song Lyrics data from database',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    song: {
      type: SongType,
      resolve: (root) => {
        return resolvers.getSong({id: root.song})
      }
    },
    content: {
      type: GraphQLString
    },
    createdDate: {
      type: GraphQLString
    },
    addedBy: {
      type: UserType,
      resolve: (root) => {
        return resolvers.getUser({id: root.addedBy})
      }
    },
    createdDateDesc: {
      type: GraphQLString
    },
  })
})
