import Validation from '../shared/Validations/Validations'
import {Model} from "mongoose";
import {customAlphabet} from "nanoid";
import ILoggedIn from './interfaces/AuthInterface'
import {AuthenticationError} from "apollo-server-errors";
class Base extends Validation {
  async getCodeNumber(name: string, model: Model<any>, objectName: string = 'code', length: number = 5) {
    let code
    let codeCheck
    const nanoid = customAlphabet('123456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz', length)
    do {
      code = nanoid()
      codeCheck = await model.findOne({ [objectName]: `${name}${code}` })
    }
    while (codeCheck)
    return `${name}${code}`
  }
  async isLoggedIn (user:ILoggedIn) {
    if(!user) throw new AuthenticationError('Login to continue');
  }
}

export default Base
