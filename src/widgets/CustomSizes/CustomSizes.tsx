import { CustomSizesModule } from '@features/CustomSizesModule'
import { Section } from '@shared/components/Section'
import { Title } from '@shared/components/Title'
import { IMAGES } from '@shared/constants/images'
import styles from './CustomSize.module.scss'
import { SwiperSlide } from 'swiper/react'
import { Paragraph } from '@shared/components/Paragraph'

export const CustomSizes = () => {
  return (
    <Section>
      <Title>2. Custom sizes</Title>
      <CustomSizesModule
        className={styles.swiper}
        slidesPerView={2}
        slidesWidths={[60, 40]}
        spaceBetween={16}
        breakpoints={{
          768: {
            slidesPerView: 3,
            slidesWidths: [50, 25, 25],
          },
        }}
      >
        {IMAGES.map((src, index) => (
          <SwiperSlide key={src + index} className={styles.slide}>
            <img src={src} alt={src + index} className={styles.slideImg} />
          </SwiperSlide>
        ))}
      </CustomSizesModule>
      <Paragraph>
        CustomSizes — обёртка над Swiper, которая позволяет задавать кастомные
        ширины для видимых слайдов (через `slidesWidths`) относительно активного
        слайда, и пересчитывает их при свайпе/смене брейкпоинта с учётом
        `spaceBetween`.
      </Paragraph>
    </Section>
  )
}
