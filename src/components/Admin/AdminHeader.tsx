import React from 'react'
import styles from './AdminHeader.module.css'

interface Props {
  onSectionChange: (section: 'products' | 'workers' | 'suppliers') => void
}

const AdminHeader: React.FC<Props> = ({ onSectionChange }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Admin - Super Dulces</h1>
      <nav className={styles.nav}>
        <button onClick={() => onSectionChange('products')}>Products</button>
        <button onClick={() => onSectionChange('workers')}>Workers</button>
        <button onClick={() => onSectionChange('suppliers')}>Suppliers</button>
        <button onClick={() => {
          localStorage.clear()
          window.location.href = '/'
        }}>Logout</button>
      </nav>
    </header>
  )
}

export default AdminHeader
