import {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList} from 'graphql'
import UserType from './user.type'
import resolvers from '../resolvers'

export default new GraphQLObjectType({
  name: 'SongImage',
  description: 'A song image data from database',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    song: {
      type: GraphQLInt
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
    likers: {
      type: new GraphQLList(UserType),
      resolve: (root) => {
        return resolvers.getUsers({ids: root.likers})
      }
    },
    dislikers: {
      type: new GraphQLList(UserType),
      resolve: (root) => {
        return resolvers.getUsers({ids: root.dislikers})
      }
    },
    url: {
      type: GraphQLString
    },
    likes: {
      type: GraphQLInt
    },
    dislikes: {
      type: GraphQLInt
    },
    createdDateDesc: {
      type: GraphQLString
    },
  })
})
