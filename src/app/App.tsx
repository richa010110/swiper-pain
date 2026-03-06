import styles from './App.module.scss'
import { DynamicPagination } from '@widgets/DynamicPagination'
import { CustomSizes } from '@widgets/CustomSizes'
import { NavigationLock } from '@widgets/NavigationLock'
import { VerticalThumbs } from '@widgets/VerticalThumbs'

export function App() {
  return (
    <div className={styles.app}>
      <DynamicPagination />
      <CustomSizes />
      <NavigationLock />
      <VerticalThumbs />
    </div>
  )
}
