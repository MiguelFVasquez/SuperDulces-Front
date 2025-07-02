import React, { useState, useEffect } from 'react'
import styles from './SupplierPage.module.css'
import { Plus, Edit, Trash2 } from 'lucide-react'
import SupplierModal, { type SupplierData } from '../../components/Supplier/SupplierModal'
import SupplierList from '../../components/Supplier/SupplierList'

const SupplierPage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Array<SupplierData & { id: string }>>([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  const loadSuppliers = async () => {
    try {
      const res = await fetch('/api/supplier/actives')
      if (!res.ok) throw new Error(`Status ${res.status}`)
      const data = await res.json()
      setSuppliers(data.content.map((s: any) => ({ ...s, id: s.idSupplier })))
    } catch (err: any) {
      console.error(err)
      alert('Failed to load suppliers: ' + err.message)
    }
  }

  useEffect(() => { loadSuppliers() }, [])

  const filtered = suppliers.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))

  const handleAdd = async (data: SupplierData) => {
    try {
      const res = await fetch('/api/supplier/newSupplier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error(`Status ${res.status}`)
      alert('Supplier added successfully')
      setShowModal(false)
      await loadSuppliers()
    } catch (err: any) {
      console.error(err)
      alert('Failed to add supplier: ' + err.message)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <input
          type="text" placeholder="Search suppliers..."
          value={search} onChange={e => setSearch(e.target.value)}
        />
        <Plus className={styles.icon} onClick={() => setShowModal(true)} />
        <Edit className={styles.icon} style={{ opacity: selected?1:0.3, cursor: selected?'pointer':'not-allowed' }} />
        <Trash2 className={styles.icon} style={{ opacity: selected?1:0.3, cursor: selected?'pointer':'not-allowed' }} />
      </div>
      <SupplierList suppliers={filtered} selectedId={selected} onSelect={setSelected} />
      {showModal && <SupplierModal onClose={() => setShowModal(false)} onSave={handleAdd} />}
    </div>
  )
}

export default SupplierPage
