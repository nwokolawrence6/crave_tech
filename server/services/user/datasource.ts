import {IUser} from '../../interfaces/databaseInterface/mongo'
import {UserInputError, ValidationError} from 'apollo-server-micro'
import __User from '../../models/user'
import Base from '../../base'
import {signJWT} from '../../helper/utils.jwt'
import ILoggedIn from '../../interfaces/AuthInterface'

class UserDataSource extends Base {
  async getCurrentUser(user: ILoggedIn) {
    await this.isLoggedIn(user)
    return __User.findById(user._id, {
      password: 0,
      lastReset: 0,
      resetPasswordToken: 0,
      resetPasswordExpires: 0
    })
  }

  async addUser(data: IUser) {
    await this.UserSignUpValidator(data)
    const {email} = data
    const user: IUser = await __User.findOne({email})
    if (user) throw new ValidationError('Account Already exist')
    const code = await this.getCodeNumber('id', __User, 'code')
    const userAccount: IUser = await __User.create({
      ...data,
      code,
    })
    return signJWT(
      {
        lastReset: userAccount.lastReset,
        email: userAccount.email,
        _id: userAccount._id,
      },
      '20s',
      '1h'
    )
  }

  async loginUser({email, password}: { email: string; password: string }) {
    await this.UserLoginValidation({email, password})
    const NotFound = 'Invalid login credentials'
    const user = await __User.findOne({email})
    if (!user) throw new UserInputError(NotFound)
    const isPass = await (__User as any).comparePassword(
      user.password,
      password
    )
    if (!isPass) throw new UserInputError(NotFound)

    return signJWT(
      {
        lastReset: user.lastReset,
        email: user.email,
        _id: user._id,
        accountType: user.accountType
      },
      '20s',
      '1h'
    )
  }

  async updatePassword(
    {oldPassword, newPassword}:
    { oldPassword: string; newPassword: string },
    account: ILoggedIn
  ) {
    await this.isLoggedIn(account)
    await this.UserUpdatePasswordValidator({oldPassword, newPassword})
    const NotFound = 'Unable to validate account'
    const user = await __User.findById(account._id,{password:1})
    if (!user) throw new UserInputError(NotFound)
    const isPassword = await (__User as any).comparePassword(
      user.password,
      oldPassword
    )
    if (!isPassword) throw new UserInputError("Incorrect current password")

    user.password = newPassword

    await (user as any).save()

    return 'updates successful'
  }
}

export default UserDataSource
