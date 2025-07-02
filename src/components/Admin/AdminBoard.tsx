// src/components/AdminBoard/AdminBoard.tsx
import React from 'react'
import styles from './AdminBoard.module.css'

// Import the page components
import WorkerPage from '../../pages/admin/WorkerPage'
import SupplierPage from '../../pages/admin/SupplierPage'
// (Later, you can create ProductPage and SupplierPage similarly)


interface Props {
  section: 'products' | 'workers' | 'suppliers'
}

const AdminBoard: React.FC<Props> = ({ section }) => {
  const renderSection = () => {
    switch (section) {
      case 'products':
        //return <ProductPage />
      case 'workers':
        return <WorkerPage />
      case 'suppliers':
        return <SupplierPage />
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
