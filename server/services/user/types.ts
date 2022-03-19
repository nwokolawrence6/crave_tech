import { gql } from 'apollo-server-micro'

const UserTypes = gql`
    extend type Mutation {
        addUser(data: userInput): String!
        loginUser(email: EmailAddress! password: String!): String!
        updatePassword(oldPassword:String! newPassword:String!):String!
        logout:String!
    }
    extend type Query {
        getCurrentUser: User!
    }
    type User {
        _id: ObjectID!
        email: EmailAddress!
        code: String!
        phone: String!
        firstName: String!
        lastName: String
        createdAt: DateTime!
    }

    input userInput {
        email: EmailAddress!
        firstName: String!
        lastName: String
        password: String!
    }

`

export default UserTypes
