import React, { useState, useEffect } from 'react';
import styles from './WorkerPage.module.css';
import { Plus, Edit, Trash2 } from 'lucide-react';
import WorkerModal, { type WorkerData } from '../../components/Worker/WorkerModal';
import WorkerList from '../../components/Worker/WorkerList';

const WorkerPage: React.FC = () => {
  const [workers, setWorkers] = useState<Array<WorkerData & { id: string }>>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

 const loadWorkers = async () => {
    try {
      const res = await fetch('/api/worker/actives')
      const raw = await res.text()
      if (!res.ok) throw new Error(`Status ${res.status}: ${raw}`)
      const data = JSON.parse(raw)                  // only parse *after* checking
      setWorkers(data.content.map((w: any) => ({ ...w, id: w.idUser })))
    } catch (err: any) {
      console.error(err)
      alert('Failed to load workers: ' + (err.message ?? err))
    }
  };

  useEffect(() => {
    loadWorkers();
  }, []);

  const filtered = workers.filter(w =>
    `${w.name} ${w.surname}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async (data: WorkerData) => {
    try {
      const res = await fetch('/api/worker/newWorker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Status ${res.status}`);
      }
      alert('Worker added successfully');
      setShowModal(false);
      await loadWorkers();
    } catch (err: any) {
      alert(`Failed to add worker: ${err.message || err}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <input
          type="text" placeholder="Search workers..."
          value={search} onChange={e => setSearch(e.target.value)}
        />
        <Plus className={styles.icon} onClick={() => setShowModal(true)} />
        <Edit
          className={styles.icon}
          onClick={() => {/* handle edit */}}
          style={{ opacity: selected ? 1 : 0.3, cursor: selected ? 'pointer' : 'not-allowed' }}
        />
        <Trash2
          className={styles.icon}
          onClick={() => {/* handle delete */}}
          style={{ opacity: selected ? 1 : 0.3, cursor: selected ? 'pointer' : 'not-allowed' }}
        />
      </div>
      <WorkerList workers={filtered} selectedId={selected} onSelect={setSelected} />
      {showModal && <WorkerModal onClose={() => setShowModal(false)} onSave={handleAdd} />}
    </div>
  );
};

export default WorkerPage;
