import type { ComponentPropsWithoutRef, ElementType } from 'react'
import clsx from 'classnames'

import styles from './Title.module.scss'

type TitleOwnProps = {
  size?: 'l' | 'm' | 's'
}

type TitleProps<T extends ElementType> = TitleOwnProps & {
  as?: T
} & Omit<ComponentPropsWithoutRef<T>, keyof TitleOwnProps | 'as'>

export const Title = <T extends ElementType = 'h2'>({
  as,
  className,
  size = 'm',
  ...props
}: TitleProps<T>) => {
  const Component = as ?? 'h2'

  return (
    <Component
      className={clsx(styles.title, styles[`size_${size}`], className)}
      {...props}
    />
  )
}

