import * as yup from 'yup'

export const authFormValidationSchema = yup.object({
  email: yup.string().trim().required('Email field is required').email('Enter valid email address'),
  password: yup
    .string()
    .required('Password field is required')
    .min(6, 'Password should include at least 6 characters')
})
