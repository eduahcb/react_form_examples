import { useState } from 'react'

import Joi from 'joi'

const userSchema = Joi.object({
  username: Joi.string().max(255).required(),
  password: Joi.string().max(20).required()
})

export const Form = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const formatErrors = (error) => JSON.parse(JSON.stringify(error)).details

  const updateErrors = (errors) => {
    for(let error of errors) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [error.path]: { message: error.message }
      }))
    }
  }

  const registerUser = async (event) =>  {
    event.preventDefault()
    setErrors({})

    try {
      await userSchema.validateAsync({ username, password }, { abortEarly: false })
      alert('ok')

    } catch (error) {
      const errors = formatErrors(error)
      updateErrors(errors) 
    }
  }

	return (
		<form>
      <label htmlFor="username">Username:</label>
      <input 
        type="text" 
        name="username" 
        id="username" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {
        !!errors.username?.message && (
          <span>{errors.username.message}</span>
        )
      }
      
      <label htmlFor="password">Password</label>
      <input 
        type="password" 
        name="password" 
        id="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {
        !!errors?.password?.message && (
          <span>{errors.password.message}</span>
        )
      }

      <button 
        type='button'
        onClick={registerUser}
      >
        register
      </button>
    </form>
	)
}
