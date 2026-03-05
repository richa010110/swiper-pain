import styles from './App.module.scss'
import { DynamicPagination } from '@widgets/DynamicPagination'

export function App() {
  return (
    <div className={styles.app}>
      <DynamicPagination />
    </div>
  )
}
