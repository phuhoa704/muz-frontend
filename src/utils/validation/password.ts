import * as yup from 'yup'
import { regexPasswordSpecialChars } from './regex'

export const passwordValidationSchema = () =>
  yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long.')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .matches(/[0-9]/, 'Password must contain at least one number.')
    .matches(
      regexPasswordSpecialChars,
      'Password must contain at least one special character.'
    )
