import React from 'react'
import styles from './SupplierList.module.css'
import type { SupplierData } from './SupplierModal'

interface Props {
  suppliers: Array<SupplierData & { id: string }>
  selectedId: string | null
  onSelect: (id: string) => void
}

const SupplierList: React.FC<Props> = ({ suppliers, selectedId, onSelect }) => (
  <ul className={styles.list}>
    <li className={styles.headerRow}>
      <span className={styles.name}>Name</span>
      <span className={styles.nit}>NIT</span>
      <span className={styles.address}>Address</span>
      <span className={styles.email}>Email</span>
      <span className={styles.phone}>Phone</span>
    </li>
    {suppliers.map(s => (
      <li
        key={s.id}
        className={s.id === selectedId ? styles.selected : ''}
        onClick={() => onSelect(s.id)}
      >
        <div className={styles.row}>
          <span className={styles.name}>{s.name}</span>
          <span className={styles.nit}>{s.nit}</span>
          <span className={styles.address}>{s.address}</span>
          <span className={styles.email}>{s.email}</span>
          <span className={styles.phone}>{s.phone}</span>
        </div>
      </li>
    ))}
  </ul>
)

export default SupplierList

