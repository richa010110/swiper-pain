import type { PropsWithChildren } from 'react'
import { Container } from '@shared/components/Container'
import styles from './Section.module.scss'

export const Section = ({ children }: PropsWithChildren) => {
  return (
    <section className={styles.section}>
      <Container>{children}</Container>
    </section>
  )
}
