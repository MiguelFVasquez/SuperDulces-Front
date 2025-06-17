// src/pages/register/RegisterPage.tsx
import React from 'react'
import HomeHeader from '../../components/HomeHeader/HomeHeader'
import RegisterForm from '../../components/Register/RegisterForm'
import styles from './RegisterPage.module.css'
import { useNavigate } from 'react-router-dom'

const RegisterPage: React.FC = () => {
  const navigate = useNavigate()

  const handleRegister = (data: {
    username: string
    email: string
    password: string
    confirmPassword: string
  }) => {
    console.log('Register data:', data)
    alert('Account created! Please log in.')
    navigate('/') // vuelve a login
  }

  return (
    <div className={styles.pageContainer}>
      <HomeHeader />
      <main className={styles.mainContent}>
        <RegisterForm onRegister={handleRegister} />
      </main>
    </div>
  )
}

export default RegisterPage
