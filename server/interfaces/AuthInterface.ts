import { ObjectId } from 'mongoose'

export default interface ILoggedIn {
  _id: ObjectId,
  email: string,
  username: string
}
