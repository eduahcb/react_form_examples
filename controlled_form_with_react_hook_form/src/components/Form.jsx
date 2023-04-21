import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const userSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required()
})

export const Form = () => {
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(userSchema)
  })

  const onSbumit = () => alert('ok')
  
	return (
		<form onSubmit={handleSubmit(onSbumit)}>
      <label htmlFor="username">Username:</label>
      <input 
        type="text"
        {...register('username')}
      />
      {
        !!errors.username?.message && (
          <span>{errors.username?.message}</span>
        )
      }

      <label htmlFor="password">Password</label>
      <input 
        type="password" 
        {...register('password')}
      />

      {
        !!errors.password?.message && (
          <span>{errors.password?.message}</span>
        )
      }

      <button 
        type='submit'
      >
        register
      </button>
    </form>
	)
}
