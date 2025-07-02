// src/components/Worker/WorkerList.tsx
import React from 'react';
import styles from './WorkerList.module.css';
import type { WorkerData } from './WorkerModal';

interface Props {
  workers: Array<WorkerData & { id: string }>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const WorkerList: React.FC<Props> = ({ workers, selectedId, onSelect }) => (
  <div>
    {/* Header row */}
    <div className={styles.headerRow}>
      <span className={styles.name}>Name</span>
      <span className={styles.surname}>Surname</span>
      <span className={styles.document}>Document</span>
      <span className={styles.email}>Email</span>
      <span className={styles.phone}>Phone</span>
    </div>

    <ul className={styles.list}>
      {workers.map(w => (
        <li
          key={w.id}
          className={w.id === selectedId ? styles.selected : ''}
          onClick={() => onSelect(w.id)}
        >
          <div className={styles.row}>
            <span className={styles.name}>{w.name}</span>
            <span className={styles.surname}>{w.surname}</span>
            <span className={styles.document}>{w.document}</span>
            <span className={styles.email}>{w.email}</span>
            <span className={styles.phone}>{w.phone}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default WorkerList;
