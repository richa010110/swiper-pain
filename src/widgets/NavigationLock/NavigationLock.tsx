import { useRef, useState } from 'react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperInstance } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Section } from '@shared/components/Section'
import { Title } from '@shared/components/Title'
import { Paragraph } from '@shared/components/Paragraph'
import { IMAGES } from '@shared/constants/images'

import styles from './NavigationLock.module.scss'
import clsx from 'classnames'

export const NavigationLock = () => {
  const [slidesCount, setSlidesCount] = useState(2)
  const [isLocked, setIsLocked] = useState(true)

  const swiperRef = useRef<SwiperInstance | null>(null)
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)

  return (
    <Section>
      <Title>3. Navigation + lock/unlock</Title>

      <div className={styles.controls}>
        <span className={styles.status}>
          Статус: {isLocked ? 'locked' : 'unlocked'}
        </span>
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setSlidesCount((value) => (value === 2 ? 6 : 2))}
        >
          {slidesCount === 2 ? 'Показать 6 слайдов' : 'Оставить 2 слайда'}
        </button>
      </div>

      <div className={styles.swiperWrapper}>
        {!isLocked && (
          <>
            <button
              ref={setPrevEl}
              type="button"
              className={clsx(styles.navButton, styles.prev)}
              aria-label="Previous slide"
            >
              Prev
            </button>
            <button
              ref={setNextEl}
              type="button"
              className={clsx(styles.navButton, styles.next)}
              aria-label="Next slide"
            >
              Next
            </button>
          </>
        )}
        <Swiper
          className={styles.swiper}
          modules={[Navigation]}
          navigation={prevEl && nextEl ? { prevEl, nextEl: nextEl } : false}
          slidesPerView={3}
          spaceBetween={12}
          onBeforeInit={(instance) => {
            swiperRef.current = instance
          }}
          onLock={() => setIsLocked(true)}
          onUnlock={() => setIsLocked(false)}
        >
          {IMAGES.slice(0, slidesCount).map((src, index) => (
            <SwiperSlide key={src + index} className={styles.slide}>
              <img src={src} alt={src + index} className={styles.slideImg} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Paragraph>
        Navigation + lock/unlock — пример со Swiper Navigation, где кнопки
        навигации рендерятся только когда свайпер не заблокирован. Состояние
        блокировки ловим через события `onLock`/`onUnlock`: при `locked` кнопки
        скрываются и навигация отключается, при `unlocked` — кнопки появляются
        снова и навигация продолжает работать.
      </Paragraph>
    </Section>
  )
}
