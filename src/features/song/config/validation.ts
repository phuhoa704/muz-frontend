import * as yup from 'yup'

export const songValidationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    minutes: yup.number().required('Minutes is required'),
    seconds: yup.number().required('Seconds is required'),
    artistId: yup.array().required('Choose artist'),
})