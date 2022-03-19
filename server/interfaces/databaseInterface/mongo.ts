import {ObjectId} from 'mongoose'


export interface IUser {
  _id: ObjectId
  email: string
  password: string
  lastReset: string
  firstName: string
  code: string
  lastName: string
  createdAt: Date
  updatedAt: Date
}
export interface ICompany {
  _id: ObjectId
  name: string
  activeStage: ObjectId
  createdAt: Date
  updatedAt: Date
}
type status = "completed" | "pending"
export interface ISteps {
  _id: ObjectId
  name: string
  status: status
  createdAt: Date
  updatedAt: Date
}
export interface IProgress {
  _id: ObjectId
  stage: string
  isCompleted: boolean
  steps:Array<ISteps>
  createdAt: Date
  updatedAt: Date
}
