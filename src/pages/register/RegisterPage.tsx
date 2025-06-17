import React from 'react'
import HomeHeader from '../../components/HomeHeader/HomeHeader'
import RegisterForm from '../../components/Register/RegisterForm'
import styles from './RegisterPage.module.css'
import { useNavigate } from 'react-router-dom'
import type { MessageDTO } from '../../types/config/MessageDTO'
import type { CreateAccountDTO } from '../../types/account/CreateAccount'

const RegisterPage: React.FC = () => {
  const navigate = useNavigate()


  const handleRegister = async (data: CreateAccountDTO) => {
    try {
      const response = await fetch('/api/public/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',},
        body: JSON.stringify(data),
      })
      console.log('ruta ', response)

      if (!response.ok) {
        // Manejar códigos HTTP fuera de 2xx
        const text = await response.text()
        throw new Error(`Server responded with status ${response.status}: ${text}`)
      }

      // parseamos JSON. Asumimos MessageDTO<string>
      const respJson: MessageDTO<string> = await response.json()

      if (respJson.error) {
        // Si tu MessageDTO indica error: true en fallo
        throw new Error(respJson.answer || 'Registration error')
      }

      // Si no hay error:
      alert(respJson.answer || 'Account created successfully')
      navigate('/') // redirigir a login
    } catch (err: any) {
      console.error('Registration failed:', err)
      // Arrojar para que RegisterForm lo capture en su .catch
      throw err.message || 'Registration failed'
    }
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
