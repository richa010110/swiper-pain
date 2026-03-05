import { DynamicPaginationModule } from '@features/DynamicPaginationModule'
import { SwiperSlide } from 'swiper/react'
import styles from './DynamicPagination.module.scss'
import { Section } from '@shared/components/Section'
import { IMAGES } from '@shared/constants/images'
import { Title } from '@shared/components/Title'
import { Paragraph } from '@shared/components/Paragraph'

export const DynamicPagination = () => {
  return (
    <Section>
      <Title>1. Dynamic Pagination</Title>
      <DynamicPaginationModule
        className={styles.swiper}
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
        {IMAGES.map((src, i) => (
          <SwiperSlide key={i} className={styles.slide}>
            <img src={src} alt={src + i} className={styles.slideImg} />
          </SwiperSlide>
        ))}
      </DynamicPaginationModule>
      <Paragraph>
        DynamicPagination — обёртка над Swiper, которая ограничивает число
        видимых буллетов пагинации и при перелистывании сдвигает их так, чтобы
        активный буллет всегда оставался в видимой области.
      </Paragraph>
    </Section>
  )
}
