import {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList} from 'graphql'
import UserType from './user.type'
import resolvers from '../resolvers'

const ReferenceType = new GraphQLObjectType({
  name: 'CommentReference',
  description: 'Comment Reference',
  fields: () => ({
    collection: {
      type: GraphQLString
    },
    id: {
      type: GraphQLInt
    }
  })
})

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'Comment data from database and virtuals',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    text: {
      type: GraphQLString
    },
    reference: {
      type: ReferenceType
    },
    parent: {
      type: CommentType,
      resolve: (root) => {
        return resolvers.getComment({id: root.parent})
      }
    },
    children: {
      type: new GraphQLList(CommentType),
      resolve: (root) => {
        return resolvers.getComments({ids: root.children})
      }
    },
    user: {
      type: UserType,
      resolve: (root) => {
        return resolvers.getUser({id: root.user})
      }
    },
    createdDate: {
      type: GraphQLString
    },
    likers: {
      type: new GraphQLList(UserType),
      resolve: (root) => {
        return resolvers.getUsers({ids: root.likers})
      }
    },
    likes: {
      type: GraphQLInt
    },
    createdDateDesc: {
      type: GraphQLString
    }
  })
})

export default CommentType
