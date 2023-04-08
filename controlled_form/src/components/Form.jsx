import { useState } from 'react'

const isEmpty = value => value.length === 0

const isLong = value => value.length >= 255

export const Form = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})


  const updateError = (field, message) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: { message }
    }))
  }

  const registerUser = (event) =>  {
    event.preventDefault()

    setErrors({})
    let isValid = true

    if(isEmpty(username)) {
      updateError('username', 'username field cannot be empty')
      isValid = false
    }
    
    if(isLong(username)) {
      updateError('username', 'username field cannot be greater than or equal to 255 characters')
      isValid = false
    }

    if(isEmpty(password)) {
      updateError('password', 'password field cannot be empty')
      isValid = false
    }
    
    if(isLong(password)) {
      updateError('password', 'password field cannot be greater than or equal to 255 characters')
      isValid = false
    }

    if(isValid) {
      alert('ok')
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
