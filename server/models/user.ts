import {model, models, Schema} from "mongoose";
import {IUser} from "../interfaces/databaseInterface/mongo";
import {randomBytes, scryptSync} from "crypto";

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    index: true,
    required: true,
    unique: true
  },
  code: {
    type: String,
    index: true,
    required: true
  },
  firstName: {
    type: String,
    trim: true,
    index: true,
    required:true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  lastReset: {
    type: String,
    default: Date.now()
  }
}, {
  timestamps: true
})
UserSchema.statics.comparePassword = async (storedPassword: string, userPassword: string) => {
  const [key, salt] = storedPassword.split(':')
  const userPass: string = scryptSync(userPassword, salt, 32).toString('hex')
  return userPass === key
}

UserSchema.pre('save', function saveHook(next) {
  if (!this.isModified('password')) return next()
  const salt = randomBytes(16).toString('hex')
  this.password = `${scryptSync(this.password, salt, 32).toString('hex')}:${salt}`
  return next()
})
export default models.users || model<IUser>('users', UserSchema)
