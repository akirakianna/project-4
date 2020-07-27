import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as Yup from 'yup'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

// username
// email
// password
// password confirmation

const schema = Yup.object().shape({
  username: Yup.string().required('Please enter a username'),
  email: Yup.string().email('Please enter a valid email address').required('Please enter your email'),
  password: Yup.string().required('Please enter a password')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter' )
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),
  password_confirmation: Yup.string().required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

const Register = () => {

  const history = useHistory()
  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(schema),
    criteriaMode: 'all'
  })

  const onSubmit = (data) => {
    axios.post('/api/register', data)
      .then(() => history.push('/login'))
      .catch(err => {
        Object.entries(err.response.data.errors).forEach(([errorField, errorMessage]) => {
          setError(errorField, { message: errorMessage })
        })
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '50vh', justifyContent: 'space-around' }}>
      <TextField
        name="username"
        inputRef={register}
        label="Username"
        type="text"
        variant="outlined"
      />
      <span>{errors.username?.message}</span>
      <TextField
        name="email"
        inputRef={register}
        label="Email"
        type="email"
        variant="outlined"
      />
      <span>{errors.email?.message}</span>
      <TextField
        name="password"
        inputRef={register}
        label="Password"
        type="password"
        variant="outlined"
      />
      <span>{errors.password?.message}</span>
      <TextField
        name="password_confirmation"
        inputRef={register}
        label="Password confirmation"
        type="password"
        variant="outlined"
      />
      <span>{errors.password_confirmation?.message}</span>
      <Button type="submit" variant="outlined">Submit</Button>
    </form>

  )

}

export default Register

