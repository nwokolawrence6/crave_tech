import {
  UserSignUpValidator,
  UserUpdatePasswordValidator,
  UserLoginValidation
} from './user/userValidationSchema'

import {ValidationError} from "apollo-server-micro";
import {
  addCompanyValidation,
  addStageAndStepsValidation
} from "./AssignmentValidations/AssignmentValidation";

class Validation {
  async UserSignUpValidator(data: any) {
    try {
      return await UserSignUpValidator.validate(data)
    } catch (e) {
      throw new ValidationError(e.message)
    }
  }

  async UserUpdatePasswordValidator(data: any) {
    try {
      return await UserUpdatePasswordValidator.validate(data)
    } catch (e) {
      throw new ValidationError(e.message)
    }
  }

  async UserLoginValidation(data: any) {
    try {
      return await UserLoginValidation.validate(data)
    } catch (e) {
      throw new ValidationError(e.message)
    }
  }

  async AddCompanyValidation(data: any) {
    try {
      return await addCompanyValidation.validate(data)
    } catch (e) {
      throw new ValidationError(e.message)
    }
  }
  async AddStageAndStepsValidation(data: any) {
    try {
      return await addStageAndStepsValidation.validate(data)
    } catch (e) {
      throw new ValidationError(e.message)
    }
  }
}

export default Validation
