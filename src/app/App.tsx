import styles from './App.module.scss'
import { DynamicPagination } from '@widgets/DynamicPagination'
import { CustomSizes } from '@widgets/CustomSizes'

export function App() {
  return (
    <div className={styles.app}>
      <DynamicPagination />
      <CustomSizes />
    </div>
  )
}
