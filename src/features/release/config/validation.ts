import * as yup from 'yup'

export const releaseValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  artistId: yup.object().required('Artist is required'),
  releaseTypeId: yup.object().required('Type is required'),
})
