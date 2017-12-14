import {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList} from 'graphql'
import CountryType from './country.type'
import SongType from './song.type'
import resolvers from '../resolvers'

export default new GraphQLObjectType({
  name: 'User',
  description: 'User data from database and virtuals',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    username: {
      type: GraphQLString
    },
    emails: {
      type: new GraphQLList(GraphQLString)
    },
    image: {
      type: GraphQLString
    },
    signature: {
      type: GraphQLString
    },
    birthDate: {
      type: GraphQLString
    },
    sex: {
      type: GraphQLString
    },
    country: {
      type: CountryType,
      resolve: (root) => {
        return resolvers.getCountry({id: root.country})
      }
    },
    joined: {
      type: GraphQLString
    },
    lastSeen: {
      type: GraphQLString
    },
    admin: {
      type: GraphQLBoolean
    },
    lastUpdated: {
      type: GraphQLString
    },
    lastUpdatedProvider: {
      type: GraphQLString
    },
    recentlyPlayed: {
      type: new GraphQLList(SongType),
      resolve: (root) => {
        return resolvers.getSongs({ids: root.recentlyPlayed})
      }
    },
    sexDesc: {
      type: GraphQLString
    },
    slug: {
      type: GraphQLString
    },
    defaultImage: {
      type: GraphQLString
    },
    isOnline: {
      type: GraphQLBoolean
    },
    lastSeenDesc: {
      type: GraphQLString
    }
  })
})
