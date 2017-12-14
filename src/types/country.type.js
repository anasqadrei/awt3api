import {GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql'

export default new GraphQLObjectType({
  name: 'Country',
  description: 'Country data from database',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    alpha2code: {
      type: GraphQLString
    },
    alpha3code: {
      type: GraphQLString
    },
    nameEN: {
      type: GraphQLString
    },
    nameAR: {
      type: GraphQLString
    }
  })
})
