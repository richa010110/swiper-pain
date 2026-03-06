import { DynamicPaginationModule } from '../DynamicPaginationModule'
import { type Swiper as SwiperInstance } from 'swiper'
import { type SwiperProps } from 'swiper/react'
import { useCallback, useEffect, useRef } from 'react'

export const CustomSizesModule = ({
  children,
  slidesWidths,
  onBeforeInit,
  ...props
}: SwiperProps) => {
  const swiperRef = useRef<SwiperInstance | null>(null)
  const rafId = useRef<number | null>(null)

  const updateSlidesWidths = useCallback(() => {
    const swiper = swiperRef.current
    if (!swiper || swiper.destroyed) return

    const slidesPerView =
      typeof swiper.params.slidesPerView === 'number'
        ? swiper.params.slidesPerView
        : 1

    const customWidths =
      (swiper.params as { slidesWidths?: number[] }).slidesWidths ?? []
    const activeIndex = swiper.activeIndex
    const spaceBetween =
      typeof swiper.params.spaceBetween === 'number'
        ? swiper.params.spaceBetween
        : 0

    const totalGap = Math.max(0, slidesPerView - 1) * spaceBetween
    const fallbackPercent = 100 / slidesPerView

    swiper.slides.forEach((slide, index) => {
      const slideEl = slide as HTMLElement
      const offset = index - activeIndex

      const isCustomVisible = offset >= 0 && offset < slidesPerView
      const percent = isCustomVisible
        ? (customWidths[offset] ?? fallbackPercent)
        : fallbackPercent

      slideEl.style.width = `calc((100% - ${totalGap}px) * ${percent / 100})`
    })
  }, [])

  useEffect(() => {
    const swiper = swiperRef.current
    if (!swiper) return

    const schedule = () => {
      if (rafId.current != null) cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(updateSlidesWidths)
    }

    swiper.on('transitionEnd', schedule)
    swiper.on('breakpoint', schedule)
    swiper.on('slidesUpdated', schedule)

    return () => {
      swiper.off('transitionEnd', schedule)
      swiper.off('breakpoint', schedule)
      swiper.off('slidesUpdated', schedule)

      if (rafId.current != null) cancelAnimationFrame(rafId.current)
    }
  }, [updateSlidesWidths])

  return (
    <DynamicPaginationModule
      {...props}
      onBeforeInit={(instance) => {
        swiperRef.current = instance

        instance.params.slidesWidths = slidesWidths
        instance.originalParams.slidesWidths = slidesWidths

        onBeforeInit?.(instance)
      }}
    >
      {children}
    </DynamicPaginationModule>
  )
}
