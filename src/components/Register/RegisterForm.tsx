// src/components/Register/RegisterForm.tsx
import React, { useState } from 'react'
import styles from './RegisterForm.module.css'
import { useNavigate } from 'react-router-dom'

interface RegisterFormProps {
  onRegister: (data: { username: string; email: string; phone:number; password: string; confirmPassword: string }) => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState(0)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    // Validaciones básicas:
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    // Aquí podrías hacer más validaciones (regex email, username, etc.)
    // Llamas al callback onRegister para que la página maneje la lógica (API, localStorage, etc.)
    onRegister({ username, email, phone,password, confirmPassword })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Register Super Dulces</h2>
      {error && <p className={styles.error}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
      <input
        type="phone"
        placeholder="Phone number"
        value={email}
        onChange={(e) => setPhone(+e.target.value)}
        required
        className={styles.inputField}
      />
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
      <button type="submit" className={styles.registerBtn}>
        Create Account
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
