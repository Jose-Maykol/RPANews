import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../services/firebase'
import './Login.css'


const Login = () => {

  const [errorLogin, setErrorLogin] = useState(false)
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  let navigate = useNavigate()

  const { email, password } = loginData

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoginData({
          email: '',
          password: '',
        })
        setErrorLogin(false)
        navigate('/', { replace: true })
      })
      .catch((e) => {
        setErrorLogin(true)
      })
  }
  return (
    <div className='login-container'>
      <div className='image-container'>
        <img src='/img/login.jpg' alt='' />
      </div>
      <div className=' form-container'>
        <h3>
          {' '}
          Bienvenido a <span> RPANews </span>
        </h3>
        <h1>INICIA SESION</h1>
        {errorLogin === true ? (
          <div className='login-alert'> Correo o contraseña incorrecto !!! </div>
        ) : null}
        <form className='login-form' onSubmit={handleSubmit}>
          <input
            className='login-input'
            type='email'
            name='email'
            id='login-email'
            placeholder='Correo electronico'
            onChange={handleChange}
            value={email}
          />
          <input
            className='login-input'
            type='password'
            name='password'
            id='login-password'
            placeholder='Contraseña'
            autoComplete='on'
            onChange={handleChange}
            value={password}
          />
          <button type='submit'>Ingresar</button>
          <p id='create'>
            ¿Aún no tienes cuenta? <Link to='/register'>Create una cuenta aqui.</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
