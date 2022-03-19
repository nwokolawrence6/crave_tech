import * as yup from 'yup'

const UserSignUpValidator = yup.object().shape({
  email: yup.string().required().email("Invalid email address. E.g. example@email.com"),
  firstName: yup.string().required('first name is required').min(2, 'First name is invalid'),
  password: yup.string().required('password is required').min(4),
  lastName: yup.string().required('last name is required'),
})
const UserUpdatePasswordValidator = yup.object().shape({
  oldPassword: yup.string().required('old password is required').label('current password').min(6),
  newPassword: yup.string().required('new password is required').label('new password').min(6)
})
const UserLoginValidation = yup.object().shape({
  email: yup.string().required().email("Invalid email address. E.g. example@email.com"),
  password: yup.string().required('password is required').min(4),
})

// ===========================================================
// EXPORT PERSON VALIDATOR CLASS
// ===========================================================
export {
  UserSignUpValidator,
  UserLoginValidation,
  UserUpdatePasswordValidator
}
