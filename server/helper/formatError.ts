import { GraphQLError, GraphQLFormattedError } from 'graphql'
const { AuthenticationError, UserInputError, ValidationError, ForbiddenError } = require('apollo-server-micro')

const ErrorFormat = (err: GraphQLError):GraphQLFormattedError => {
  if (err.originalError instanceof AuthenticationError) {
    return err
  }
  if (err.originalError instanceof UserInputError) {
    return err
  }
  if (err.originalError instanceof ValidationError) {
    return err
  }
  if (err.originalError instanceof ForbiddenError) {
    return err
  }
  console.error(`Server Error: ${JSON.stringify(err, null, 1)}`)
  return new Error('Internal server error')
}
export default ErrorFormat
