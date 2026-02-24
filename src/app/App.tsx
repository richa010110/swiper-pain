import { Container } from '@components'

import styles from './App.module.scss'

export function App() {
  return (
    <div className={styles.app}>
      <Container>
        <h1 className={styles.title}>Meetup</h1>
      </Container>
    </div>
  )
}
