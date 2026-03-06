import { useState } from 'react'
import type { Swiper as SwiperInstance } from 'swiper'
import { Thumbs, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Section } from '@shared/components/Section'
import { Title } from '@shared/components/Title'
import { Paragraph } from '@shared/components/Paragraph'
import { IMAGES } from '@shared/constants/images'

import styles from './VerticalThumbs.module.scss'

export const VerticalThumbs = () => {
  const [thumbsEnabled, setThumbsEnabled] = useState(true)
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance | null>(null)
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)

  const activeThumbsSwiper =
    thumbsEnabled && thumbsSwiper && !thumbsSwiper.destroyed
      ? thumbsSwiper
      : null

  return (
    <Section>
      <Title>4. Vertical thumbs</Title>

      <div className={styles.controls}>
        <span className={styles.status}>
          Thumbs: {thumbsEnabled ? 'On' : 'Off'}
        </span>
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setThumbsEnabled((value) => !value)}
        >
          {thumbsEnabled ? 'Выключить thumbs' : 'Включить thumbs'}
        </button>
      </div>

      <div className={styles.layout}>
        {thumbsEnabled && (
          <div className={styles.thumbsColumn}>
            <button
              type="button"
              ref={setPrevEl}
              className={styles.thumbsNav}
              aria-label="Thumbs: previous"
            >
              Up
            </button>

            <Swiper
              className={styles.thumbs}
              modules={[Thumbs, Navigation]}
              navigation={prevEl && nextEl ? { prevEl, nextEl: nextEl } : false}
              watchSlidesProgress
              onSwiper={setThumbsSwiper}
              onDestroy={() => setThumbsSwiper(null)}
              direction="vertical"
              slidesPerView={3}
              spaceBetween={10}
            >
              {IMAGES.map((src, index) => (
                <SwiperSlide key={src + index} className={styles.thumbSlide}>
                  <img
                    src={src}
                    alt={src + index}
                    className={styles.thumbImg}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              ref={setNextEl}
              className={styles.thumbsNav}
              aria-label="Thumbs: next"
            >
              Down
            </button>
          </div>
        )}

        <Swiper
          key={thumbsEnabled ? 'thumbs-on' : 'thumbs-off'}
          className={styles.main}
          modules={[Thumbs]}
          spaceBetween={12}
          slidesPerView={1}
          thumbs={{
            swiper: activeThumbsSwiper,
          }}
        >
          {IMAGES.map((src, index) => (
            <SwiperSlide key={src + index} className={styles.mainSlide}>
              <img src={src} alt={src + index} className={styles.mainImg} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Paragraph>
        VerticalThumbs — пример связки двух свайперов через модуль `Thumbs`:
        слева вертикальные превью (thumbs), справа основной слайдер. Для thumbs
        добавлена навигация кнопками (Up/Down), а также переключатель `Thumbs:
        On | Off`, который скрывает блок превью и отключает их влияние на
        основной свайпер.
      </Paragraph>
    </Section>
  )
}
