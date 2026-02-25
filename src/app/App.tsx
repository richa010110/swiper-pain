import { SwiperSlide } from 'swiper/react'

import styles from './App.module.scss'
import { DynamicPaginationSwiper } from '@features/DynamicPaginationSwiper'
import { Section } from '@shared/Section'

export function App() {
  return (
    <div className={styles.app}>
      <Section>
        <DynamicPaginationSwiper
          slidesPerView={2.2}
          spaceBetween={12}
          maxPaginationBullets={3}
          breakpoints={{
            768: {
              slidesPerView: 3,
              maxPaginationBullets: 5,
            },
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <SwiperSlide key={i}>
              <div className={styles.slide}>Slide {i + 1}</div>
            </SwiperSlide>
          ))}
        </DynamicPaginationSwiper>
      </Section>
    </div>
  )
}
