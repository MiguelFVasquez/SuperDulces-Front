import React from 'react'
import styles from './AdminBoard.module.css'

interface Props {
  section: 'products' | 'workers' | 'suppliers'
}

const AdminBoard: React.FC<Props> = ({ section }) => {
  const renderSection = () => {
    switch (section) {
      case 'products':
        return <div>📦 Manage Products</div>
      case 'workers':
        return <div>👷 Manage Workers</div>
      case 'suppliers':
        return <div>🚚 Manage Suppliers</div>
      default:
        return null
    }
  }

  return (
    <div className={styles.board}>
      {renderSection()}
    </div>
  )
}

export default AdminBoard
