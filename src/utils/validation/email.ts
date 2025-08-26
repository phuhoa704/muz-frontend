import * as yup from 'yup'

export const emailValidationSchema = yup.string().email()
