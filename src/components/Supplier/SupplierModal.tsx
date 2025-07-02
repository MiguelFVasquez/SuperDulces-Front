import React, { useState } from 'react'
import styles from './SupplierModal.module.css'
import { X } from 'lucide-react'

export interface SupplierData {
  name: string
  nit: string
  address: string
  email: string
  phone: string
}

interface SupplierModalProps {
  onClose: () => void
  onSave: (data: SupplierData) => void
}

const SupplierModal: React.FC<SupplierModalProps> = ({ onClose, onSave }) => {
  const [form, setForm] = useState<SupplierData>({
    name: '', nit: '', address: '', email: '', phone: ''
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}><X /></button>
        <h2>Add Supplier</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input name="nit" placeholder="NIT" value={form.nit} onChange={handleChange} required />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  )
}

export default SupplierModal

