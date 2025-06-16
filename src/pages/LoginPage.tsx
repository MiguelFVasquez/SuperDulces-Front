import HomeHeader from '../components/HomeHeader/HomeHeader'
import LoginForm from '../components/Login/LoginForm'
import styles from './LoginPage.module.css'  

const LoginPage = () => {
  const handleLogin = (username: string, password: string) => {
    // Replace with real logic
    if (username === 'admin' && password==='admin1234') {
      localStorage.setItem('role', 'admin')
      window.location.href = '/admin'
    } else {
      localStorage.setItem('role', 'client')
      window.location.href = '/client'
    }
  }

  const handleRegister = () => {
    alert('Redirect to registration page')
    // navigate to /register or open modal
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
