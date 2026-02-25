import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Swiper as SwiperInstance } from 'swiper'
import { Pagination } from 'swiper/modules'
import { Swiper, type SwiperProps } from 'swiper/react'

import 'swiper/css'

import styles from './DynamicPaginationSwiper.module.scss'

export type DynamicPaginationSwiperProps = SwiperProps & {
  maxPaginationBullets?: number
}

export function DynamicPaginationSwiper({
  children,
  maxPaginationBullets = 5,
  className,
  modules,
  onBeforeInit,
  ...props
}: DynamicPaginationSwiperProps) {
  const swiperRef = useRef<SwiperInstance | null>(null)
  const [isReady, setIsReady] = useState(false)
  const refId = useRef<number | null>(null)
  const paginationWrapperRef = useRef<HTMLDivElement | null>(null)
  const paginationElRef = useRef<HTMLDivElement | null>(null)

  const maxVisible = useMemo(() => {
    const value = Math.floor(maxPaginationBullets)
    if (!Number.isFinite(value) || value <= 0) return 1
    return value
  }, [maxPaginationBullets])

  const updatePagination = useCallback(() => {
    const swiper = swiperRef.current
    if (!swiper || swiper.destroyed) return

    const paginationWrapperEl = paginationWrapperRef.current
    const paginationEl = paginationElRef.current
    if (!paginationWrapperEl || !paginationEl) return

    const bullets =
      (swiper.pagination?.bullets as HTMLElement[] | undefined) ??
      Array.from(
        paginationEl.querySelectorAll<HTMLElement>('.swiper-pagination-bullet'),
      )
    if (bullets.length === 0) return

    const total = bullets.length
    const visibleCount = Math.min(maxVisible, total)

    let current = 0
    if (swiper.params.loop) {
      const slidesPerGroup = swiper.params.slidesPerGroup || 1
      current =
        slidesPerGroup > 1
          ? Math.floor(swiper.realIndex / slidesPerGroup)
          : swiper.realIndex
    } else if (typeof swiper.snapIndex !== 'undefined') {
      current = swiper.snapIndex
    } else {
      current = swiper.activeIndex || 0
    }
    const activeIndex = Math.max(0, Math.min(total - 1, current))

    const center = Math.floor(visibleCount / 2)
    const maxStart = Math.max(0, total - visibleCount)
    const start = Math.max(0, Math.min(maxStart, activeIndex - center))
    const end = start + visibleCount - 1

    const hasHiddenLeft = start > 0
    const hasHiddenRight = end < total - 1

    for (const bullet of bullets) bullet.classList.remove(styles.edge)

    if (hasHiddenLeft && start !== activeIndex)
      bullets[start]?.classList.add(styles.edge)
    if (hasHiddenRight && end !== activeIndex)
      bullets[end]?.classList.add(styles.edge)

    const first = bullets[0]
    const second = bullets[1]
    const bulletWidthPx = first?.offsetWidth ?? 0
    const stepPx = (() => {
      if (!first || !second) return bulletWidthPx

      const offsetStep = second.offsetLeft - first.offsetLeft
      if (offsetStep !== 0) return offsetStep

      const firstRect = first.getBoundingClientRect()
      const secondRect = second.getBoundingClientRect()
      const rectStep = secondRect.left - firstRect.left
      if (rectStep !== 0) return rectStep

      return bulletWidthPx
    })()
    const stepAbsPx = Math.abs(stepPx)
    const translatePx = stepAbsPx > 0 ? start * stepPx : 0
    paginationEl.style.transform = `translateX(${-translatePx}px)`

    if (visibleCount < total) {
      const widthPx =
        stepAbsPx > 0 ? stepAbsPx * (visibleCount - 1) + bulletWidthPx : 0
      paginationWrapperEl.style.width = widthPx > 0 ? `${widthPx}px` : ''
    } else {
      paginationWrapperEl.style.width = ''
    }
  }, [maxVisible])

  useEffect(() => {
    const swiper = swiperRef.current
    if (!isReady || !swiper) return

    const schedule = () => {
      if (refId.current != null) cancelAnimationFrame(refId.current)
      refId.current = requestAnimationFrame(updatePagination)
    }

    schedule()

    swiper.on('slideChange', schedule)
    swiper.on('snapIndexChange', schedule)
    swiper.on('paginationUpdate', schedule)
    swiper.on('breakpoint', schedule)
    swiper.on('update', schedule)

    return () => {
      swiper.off('slideChange', schedule)
      swiper.off('snapIndexChange', schedule)
      swiper.off('paginationUpdate', schedule)
      swiper.off('breakpoint', schedule)
      swiper.off('update', schedule)
      if (refId.current != null) cancelAnimationFrame(refId.current)
    }
  }, [isReady, updatePagination])

  return (
    <Swiper
      {...props}
      className={[styles.root, className].filter(Boolean).join(' ')}
      modules={[Pagination, ...(modules ?? [])]}
      onBeforeInit={(instance) => {
        swiperRef.current = instance
        if (
          instance.params.pagination &&
          typeof instance.params.pagination !== 'boolean'
        ) {
          instance.params.pagination.el = paginationElRef.current
        }
        if (
          instance.originalParams.pagination &&
          typeof instance.originalParams.pagination !== 'boolean'
        ) {
          instance.originalParams.pagination.el = paginationElRef.current
        }
        setIsReady(true)
        onBeforeInit?.(instance)
      }}
      pagination={{
        clickable: true,
        el: styles.pagination,
        renderBullet: (index, bulletClassName) =>
          `<button type="button" class="${bulletClassName} ${styles.bullet}" aria-label="Go to slide ${index + 1}"></button>`,
      }}
    >
      {children}
      <div ref={paginationWrapperRef} className={styles['pagination-wrapper']}>
        <div
          ref={paginationElRef}
          className={`swiper-pagination ${styles.pagination}`}
        />
      </div>
    </Swiper>
  )
}
