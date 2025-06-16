import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
// Placeholder components:
const AdminDashboard = () => <h2>Admin Panel</h2>
const ClientDashboard = () => <h2>Client Dashboard</h2>

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/client" element={<ClientDashboard />} />
    </Routes>
  )
}

export default AppRoutes
