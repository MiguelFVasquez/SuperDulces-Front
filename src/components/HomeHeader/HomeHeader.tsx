import React from 'react'
import styles from './HomeHeader.module.css'

interface HomeHeaderProps {
  // Si en el futuro quieres pasar un título dinámico, podrías habilitar props.title
  // title?: string
}

const HomeHeader: React.FC<HomeHeaderProps> = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Super Dulces</h1>
    </header>
  )
}

export default HomeHeader
