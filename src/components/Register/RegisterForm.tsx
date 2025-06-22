import React, { useState } from 'react'
import styles from './RegisterForm.module.css'
import type { CreateAccountDTO } from '../../types/account/CreateAccount'
import { useNavigate } from 'react-router-dom'

interface RegisterFormProps {
  onRegister: (data: CreateAccountDTO) => Promise<void>
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [idUser, setIdUser] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validaciones básicas:
    if (!idUser.trim() || !name.trim() || !phoneNumber.trim() || !email.trim() || !password) {
      setError('All fields are required')
      return
    }
    // Confirmar contraseña
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    // Longitud mínima de contraseña (opcional; según tu política)
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    // Validación básica de email (regex simple). Opcional, puedes usar librería de validación.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Invalid email address')
      return
    }
    // Validación básica de phoneNumber: por ejemplo, dígitos y longitud mínima
    const phoneDigits = phoneNumber.replace(/\D/g, '')
    if (phoneDigits.length < 7) {
      setError('Invalid phone number')
      return
    }

    // Si pasa validaciones, construir DTO sin confirmPassword
    const dto: CreateAccountDTO = {
      idUser: idUser.trim(),
      name: name.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
      password,
    }

    setLoading(true)
    onRegister(dto)
      // Si onRegister devuelve una promesa, podemos manejar finally:
      .catch((err) => {
        // Si onRegister arroja error, muéstralo
        console.error('Registration error:', err)
        setError(typeof err === 'string' ? err : 'Registration failed')
      })
      .finally(() => setLoading(false))
  }

  return (
  <form className={styles.form} onSubmit={handleSubmit}>
    <h2 className={styles.title}>Register Super Dulces</h2>
    {error && <p className={styles.error}>{error}</p>}

    <div className={styles.inputGroup}>
      <input
        type="text"
        placeholder="Username"
        value={idUser}
        onChange={(e) => setIdUser(e.target.value)}
        required
        className={styles.inputField}
      />
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className={styles.inputField}
      />
    </div>

    <div className={styles.inputGroup}>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
        className={styles.inputField}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={styles.inputField}
      />
    </div>

    <div className={styles.inputGroup}>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={styles.inputField}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className={styles.inputField}
      />
    </div>

    <button
      type="submit"
      className={styles.registerBtn}
      disabled={loading}
    >
      {loading ? 'Creating...' : 'Create Account'}
    </button>

    <p className={styles.loginPrompt}>
      Already have an account?{' '}
      <span
        className={styles.loginLink}
        onClick={() => navigate('/')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') navigate('/')
        }}
      >
        Log In
      </span>
    </p>
  </form>
  )
}

export default RegisterForm
