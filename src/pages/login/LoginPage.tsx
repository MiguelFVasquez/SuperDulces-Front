import HomeHeader from '../../components/HomeHeader/HomeHeader'
import LoginForm from '../../components/Login/LoginForm'
import styles from './LoginPage.module.css'  
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {
  const navigate = useNavigate()


  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch('/api/public/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Login failed: ${response.status} - ${errorText}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error('Invalid credentials')
      }

      const token = data.answer.token

      // Decode token to get role (optional, but you need it here)
      const payloadBase64 = token.split('.')[1]
      const payloadJson = atob(payloadBase64)
      const payload = JSON.parse(payloadJson)

      const role = payload.rol.toLowerCase() // 'admin' or 'client'

      // Store token and role (optional: also user id or email)
      localStorage.setItem('token', token)
      localStorage.setItem('role', role)

      // Redirect
      if (role === 'admin') {
        window.location.href = '/admin'
      } else {
        window.location.href = '/client'
      }
    } catch (error: any) {
      console.error('Login error:', error)
      alert(error.message || 'Login failed')
    }
  }


  const handleRegister = () => {
    navigate('/register')
  }


  return (
    <div className={styles.pageContainer}>
      <HomeHeader />
      <main className={styles.mainContent}>
        <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
      </main>
    </div>
  )
}

export default LoginPage
