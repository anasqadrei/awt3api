import {GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql'
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
      type: GraphQLInt
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
