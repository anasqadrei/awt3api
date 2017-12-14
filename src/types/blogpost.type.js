import {GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql'

export default new GraphQLObjectType({
  name: 'Blogpost',
  description: 'Blog post data from database',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    title: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
    metaTags: {
      type: GraphQLString
    },
    createdDate: {
      type: GraphQLString
    },
    commentsCount: {
      type: GraphQLInt
    },
    viewsCount: {
      type: GraphQLInt
    },
    slug: {
      type: GraphQLString
    },
    createdDateDesc: {
      type: GraphQLString
    },
  })
})
