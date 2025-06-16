import React, { useState } from 'react'
import styles from './LoginForm.module.css'

interface Props {
  onLogin: (username: string, password: string) => void
  onRegister: () => void
}

const LoginForm: React.FC<Props> = ({ onLogin, onRegister }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(username, password)
  }

  return (
   <div className={styles.container}>

     <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit" className={styles.loginBtn}>Login</button>
    
        <div className={styles.registerContainer}>
        <p className={styles.registerPrompt}>Don't have an account? Register:</p>
        <button 
            type="button" 
            onClick={onRegister} 
            className={styles.registerBtn}
            aria-label="Register new account"
        >
            Register
        </button>
        </div>
    </form>
    </div>
  )
}

export default LoginForm
