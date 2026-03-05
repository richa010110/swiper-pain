import type { ComponentPropsWithoutRef, ElementType } from 'react'
import clsx from 'classnames'

import styles from './Paragraph.module.scss'

type ParagraphOwnProps = {
  size?: 'l' | 'm' | 's'
}

type ParagraphProps<T extends ElementType> = ParagraphOwnProps & {
  as?: T
} & Omit<ComponentPropsWithoutRef<T>, keyof ParagraphOwnProps | 'as'>

export const Paragraph = <T extends ElementType = 'p'>({
  as,
  className,
  size = 'm',
  ...props
}: ParagraphProps<T>) => {
  const Component = as ?? 'p'

  return (
    <Component
      className={clsx(styles.paragraph, styles[`size_${size}`], className)}
      {...props}
    />
  )
}

