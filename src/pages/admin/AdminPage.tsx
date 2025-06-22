import { useState } from 'react'
import AdminHeader from '../../components/Admin/AdminHeader'
import AdminBoard from '../../components/Admin/AdminBoard'
import styles from './AdminPage.module.css'

const AdminPage = () => {
  const [section, setSection] = useState<'products' | 'workers' | 'suppliers'>('products')

  return (
    <div className={styles.container}>
      <AdminHeader onSectionChange={setSection} />
      <AdminBoard section={section} />
    </div>
  )
}

export default AdminPage
