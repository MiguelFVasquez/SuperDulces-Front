import React, { useState } from 'react';
import styles from './WorkerModal.module.css';
import { X } from 'lucide-react';

export interface WorkerData {
  name: string;
  surname: string;
  document: string;
  email: string;
  phone: string;
  address: string;
  wage: number;
  hoursPerWeek: number;
  function: 'CASHIER' | 'ADMINISTRATOR' | 'WAREHOUSE' | 'STOCK';
  dateOfBirth: string; // ISO date
}

interface WorkerModalProps {
  onClose: () => void;
  onSave: (data: WorkerData) => void;
}

const WorkerModal: React.FC<WorkerModalProps> = ({ onClose, onSave }) => {
  const [form, setForm] = useState<WorkerData>({
    name: '', surname: '', document: '', email: '', phone: '', address: '',
    wage: 0, hoursPerWeek: 0, function: 'CASHIER', dateOfBirth: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'wage' || name === 'hoursPerWeek' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}><X /></button>
        <h2>Add New Worker</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input name="surname" placeholder="Surname" value={form.surname} onChange={handleChange} required />
          <input name="document" placeholder="Document" value={form.document} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
          <input name="wage" type="number" placeholder="Wage" value={form.wage} onChange={handleChange} required />
          <input name="hoursPerWeek" type="number" placeholder="Hours/Week" value={form.hoursPerWeek} onChange={handleChange} required />
          <select name="function" value={form.function} onChange={handleChange}>
            <option value="CASHIER">Cashier</option>
            <option value="ADMINISTRATOR">Administrator</option>
            <option value="WAREHOUSE">Warehouse</option>
            <option value="STOCK">Stock</option>
          </select>
          <input name="dateOfBirth" type="date" placeholder="Date of Birth" value={form.dateOfBirth} onChange={handleChange} required />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default WorkerModal;
